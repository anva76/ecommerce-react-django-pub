from django.contrib import admin
from product.models import Product, Category, Brand


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at", "updated_at")
    list_display_links = ["name"]
    search_fields = ["name", "description"]


class BrandAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at", "updated_at")
    list_display_links = ["name"]
    search_fields = ["name", "description"]


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "brand",
        "price",
        "discounted_price",
        "category",
        "props",
        "updated_at",
    ]
    list_display_links = ["name"]
    search_fields = ["name", "description"]


admin.site.register(Category, CategoryAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Product, ProductAdmin)
