from rest_framework import serializers
from product.serializers import ProductSerializerShort
from .models import OrderItem, Order
from product.models import Product
from datetime import datetime


class OrderItemCreateSerializer(serializers.Serializer):
    """Serializer for creating order items from an API request."""

    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, max_value=10)


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for OrderItem Model."""

    product = ProductSerializerShort()

    class Meta:
        model = OrderItem
        fields = [
            "product",
            "quantity",
            "price",
        ]


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order Model."""

    order_items = OrderItemSerializer(many=True)
    # Render choice field via predefined mechanism
    status = serializers.CharField(
        source="get_status_display", read_only=True
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "first_name",
            "last_name",
            "order_number",
            "total_amount",
            "status",
            "items_count",
            "country",
            "created_at",
            "updated_at",
            "order_items",
        ]


class OrderDetailSerializer(OrderSerializer):
    class Meta(OrderSerializer.Meta):
        fields = OrderSerializer.Meta.fields + [
            "email",
            "phone",
            "street_address_1",
            "street_address_2",
            "city",
            "province",
            "postal_code",
        ]


class OrderCreateSerializer(OrderDetailSerializer):
    """Serializer for creating a new order."""

    # Assign order_items to another nested serializer to process incoming data
    order_items = OrderItemCreateSerializer(many=True)

    phone = serializers.RegexField(
        regex=r"^\+([0-9]{1,3})[-. ]?([0-9]{2,3})[-. ]?([0-9]{3,4})[-. ]?([0-9]{3,4})$",
    )
    first_name = serializers.RegexField(
        regex=r"^[\w\s\'\.-_]+$",
    )
    last_name = serializers.RegexField(
        regex=r"^[\w\s\'\.-_]+$",
    )
    email = serializers.EmailField()

    class Meta(OrderDetailSerializer.Meta):
        read_only_fields = [
            "id",
            "total_amount",
            "items_count",
            "status",
            "order_number",
        ]

    def _user(self):
        request = self.context.get("request", None)
        if request:
            return request.user

    def create(self, validated_data):
        items = validated_data.pop("order_items", None)
        if items is None:
            raise serializers.ValidationError("Order items are missing.")

        user = self._user()
        total_amount = 0
        items_count = 0
        order_items = []

        for item in items:
            product = Product.get_one_or_none(item["product_id"])
            if product is None:
                raise serializers.ValidationError("Incorrect product id.")

            order_item = OrderItem()

            price = product.get_actual_price()
            total_amount += item["quantity"] * price
            items_count += item["quantity"]

            order_item.price = price
            order_item.product_id = product.id
            order_item.quantity = item["quantity"]
            order_items.append(order_item)

        order = Order(**validated_data)
        order.total_amount = total_amount
        order.items_count = items_count
        order.user_id = user.id
        order.status = Order.Status.Submitted
        order.save()

        current_date = datetime.today().strftime("%Y%m%d")
        order.order_number = current_date + "." + str(order.id)
        order.save()

        for order_item in order_items:
            order_item.order_id = order.id
        OrderItem.objects.bulk_create(order_items)

        return order
