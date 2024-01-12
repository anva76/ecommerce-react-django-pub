from rest_framework import serializers
from .models import Product, Category, Brand


class BrandSerializer(serializers.ModelSerializer):
    """Serializer for the Brand API."""

    class Meta:
        model = Brand
        fields = [
            "id",
            "name",
        ]


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the Category API."""

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
        ]


class CategoryDetailSerializer(CategorySerializer):
    class Meta(CategorySerializer.Meta):
        fields = CategorySerializer.Meta.fields + [
            "description",
            "created_at",
            "updated_at",
        ]


class ProductSerializerShort(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "price",
            "discounted_price",
            "image",
            "category_id",
        )


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for the Product API."""

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "discounted_price",
            "image",
            "featured",
            "brand_id",
            "category_id",
            "props",
        ]


class ProductDetailSerializer(ProductSerializer):
    brand = serializers.CharField(source="brand.name", allow_null=True)
    category = serializers.CharField(source="category.name")

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + [
            "brand",
            "category",
            "description",
            "created_at",
            "updated_at",
        ]
