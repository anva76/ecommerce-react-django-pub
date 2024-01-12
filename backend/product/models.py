import os
import uuid
from django.db import models
from core.models import BaseModel


def product_image_file_name(instance, filename):
    """File path for a new product image."""
    ext = os.path.splitext(filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    return os.path.join("uploads", "product", filename)


class Category(BaseModel):
    """Category model."""

    class Meta:
        verbose_name_plural = "Categories"

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"


class Brand(BaseModel):
    """Brand model."""

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"


class Product(BaseModel):
    """Product model."""

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    image = models.ImageField(null=True, blank=True, upload_to=product_image_file_name)
    featured = models.BooleanField(default=False)

    props = models.JSONField(blank=True, null=True)
    colors = models.JSONField(blank=True, null=True)

    brand = models.ForeignKey(
        Brand,
        related_name="products",
        on_delete=models.PROTECT,
        null=True,
        default=None,
        blank=True,
    )

    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.PROTECT,
    )

    def get_actual_price(self):
        if self.discounted_price:
            return self.discounted_price
        else:
            return self.price

    def __str__(self):
        return f"{self.name}"
