from django.urls import path
from product import views

app_name = "product"

urlpatterns = [
    path("products/", views.ProductView.as_view(), name="product-list"),
    path(
        "products/<int:pk>",
        views.ProductDetailView.as_view(),
        name="product-detail",
    ),
    path("categories/", views.CategoryView.as_view(), name="category-list"),
    path(
        "categories/<int:pk>",
        views.CategoryDetailView.as_view(),
        name="category-detail",
    ),
    path("brands/", views.BrandView.as_view(), name="brand-list"),
]
