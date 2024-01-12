from rest_framework import generics
from .serializers import (
    ProductSerializer,
    ProductDetailSerializer,
    CategorySerializer,
    CategoryDetailSerializer,
    BrandSerializer,
)
from .models import Product, Category, Brand

from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from .filters import ProductFilter
from django_filters import rest_framework as filters
from django.db.models.functions import Coalesce


# For browsable APIs
@extend_schema_view(
    get=extend_schema(
        parameters=[
            OpenApiParameter(
                name="sort",
                description="Apply sorting to the list of products.",
                type=OpenApiTypes.STR,
            ),
        ]
    )
)
class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = ProductFilter
    ordering_fileds = ["price", "name"]

    def apply_sorting(self, queryset, sort):
        if sort in ["price", "-price", "name", "-name"]:
            if sort == "price":
                queryset = queryset.annotate(
                    real_price=Coalesce("discounted_price", "price")
                ).order_by("real_price")
            elif sort == "-price":
                queryset = queryset.annotate(
                    real_price=Coalesce("discounted_price", "price")
                ).order_by("-real_price")
            else:
                queryset = queryset.order_by(sort)
        else:
            queryset = queryset.order_by("-created_at")

        return queryset

    def get_queryset(self):
        sort = self.request.query_params.get("sort")
        queryset = super().get_queryset()

        if sort:
            queryset = self.apply_sorting(queryset, sort)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()


class CategoryView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryDetailView(generics.RetrieveAPIView):
    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()


class BrandView(generics.ListAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()
