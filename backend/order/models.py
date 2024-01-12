from django.db import models
from django.conf import settings
from product.models import Product
from core.models import BaseModel


class Order(BaseModel):
    class Status(models.TextChoices):
        NotDefined = "not_defined", "Not Defined"
        Submitted = "submitted", "Submitted"
        Accepted = "accepted", "Accepted"
        InAssembly = "in_assembly", "In Assembly"
        InDelivery = "in_delivery", "In Delivery"
        Delivered = "delivered", "Delivered"
        Cancelled = "cancelled", "Cancelled"

    status = models.CharField(
        max_length=30, choices=Status.choices, default=Status.NotDefined
    )

    order_number = models.CharField(max_length=30, unique=True, blank=False)
    total_amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=False
    )
    items_count = models.IntegerField(blank=False)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="orders",
        on_delete=models.PROTECT,
    )

    # Order Address
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=50, blank=False)
    street_address_1 = models.CharField(max_length=50, blank=False)
    street_address_2 = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=False)
    province = models.CharField(max_length=50, blank=False)
    postal_code = models.CharField(max_length=50, blank=False)
    country = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}: {self.order_number}"

    @classmethod
    def get_one_or_none(cls, id):
        item = None
        try:
            item = cls.objects.get(pk=id)
        except cls.DoesNotExist:
            return None

        return item


class OrderItem(BaseModel):
    order = models.ForeignKey(
        Order, related_name="order_items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.IntegerField(blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"

    class Meta:
        verbose_name = "Order item"
        verbose_name_plural = "Order items"
