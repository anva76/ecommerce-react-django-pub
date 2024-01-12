from .models import Product
from django.db.models import Q
from django_filters import rest_framework as filters


class ProductFilter(filters.FilterSet):
    class Meta:
        model = Product
        fields = ["featured", "category", "brand"]

    featured = filters.BooleanFilter(method="featured_filter")
    category = filters.CharFilter(method="category_filter")
    category_id = filters.NumberFilter(field_name="category_id")
    brand = filters.CharFilter(method="brand_filter")
    brand_id = filters.NumberFilter(field_name="brand_id")
    search = filters.CharFilter(method="search_filter")

    # min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    # max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")
    max_price = filters.NumberFilter(method="max_price_filter")
    min_price = filters.NumberFilter(method="min_price_filter")

    color = filters.CharFilter(field_name="colors", lookup_expr="icontains")

    ram = filters.CharFilter(field_name="props__RAM", lookup_expr="iexact")
    storage = filters.CharFilter(field_name="props__storage", lookup_expr="iexact")
    hdd = filters.CharFilter(field_name="props__HDD", lookup_expr="iexact")
    ssd = filters.CharFilter(field_name="props__SSD", lookup_expr="iexact")
    processor = filters.CharFilter(field_name="props__processor", lookup_expr="iexact")

    # color = filters.CharFilter(method="color_filter")

    # def color_filter(self, queryset, name, value):
    #     return queryset.filter(colors__icontains=value)

    def category_filter(self, queryset, name, value):
        return queryset.filter(category__name__iexact=value)

    def brand_filter(self, queryset, name, value):
        return queryset.filter(brand__name__iexact=value)

    def featured_filter(self, queryset, name, value):
        return queryset.filter(featured=value)[:6]

    def search_filter(self, queryset, name, value):
        # "name" in the expression below is not the name argument
        return queryset.filter(
            Q(name__icontains=value) | Q(description__icontains=value)
        )

    def max_price_filter(self, queryset, name, value):
        return queryset.filter(Q(price__lte=value) | Q(discounted_price__lte=value))

    def min_price_filter(self, queryset, name, value):
        return queryset.exclude(price__lt=value).exclude(discounted_price__lt=value)
