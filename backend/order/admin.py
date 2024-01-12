from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ["product", "quantity", "price"]
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False

    list_display = [
        "id",
        "order_number",
        "first_name",
        "last_name",
        "phone",
        "email",
        "total_amount",
        "country",
        "user",
        "updated_at",
        "created_at",
    ]
    list_display_links = ["order_number"]
    readonly_fields = ["user", "order_number", "total_amount", "items_count"]
    search_fields = [
        "order_number",
        "first_name",
        "last_name",
        "phone",
        "email",
    ]
    list_filter = ["status"]
    inlines = [OrderItemInline]
