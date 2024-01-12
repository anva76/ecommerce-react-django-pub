from django.urls import path
from order import views

app_name = "order"

urlpatterns = [
    path(
        "orders/",
        views.OrderViewSet.as_view({"get": "list", "post": "create"}),
        name="order-list",
    ),
    path(
        "orders/<int:pk>",
        views.OrderDetailView.as_view(),
        name="order-detail",
    ),
]
