from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.renderers import JSONRenderer

from product.models import Category, Brand, Product
from product.serializers import ProductSerializer, ProductDetailSerializer

PRODUCTS_URL = reverse("product:product-list")


def get_product_detail_url(id):
    return reverse("product:product-detail", args=[id])


class PublicProductAPITest(TestCase):
    def SetUp(self):
        self.client = APIClient()

    def test_get_all_products(self):
        """Test retrieving all products."""
        test_props = {"size": "XXL"}
        category = Category.objects.create(name="Shirts")

        Product.objects.create(
            name="Classic Shirt1", price=50.0, category=category, props=test_props
        )
        Product.objects.create(
            name="Classic Shirt2", price=50.0, category=category, props=test_props
        )

        res = self.client.get(PRODUCTS_URL)

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_one_product(self):
        """Test retrieving a specific product."""
        test_props = {"size": "XXL"}
        category = Category.objects.create(name="Shirts")

        product = Product.objects.create(
            name="Classic Shirt1", price=50.0, category=category, props=test_props
        )

        url = get_product_detail_url(product.id)
        res = self.client.get(url)

        serializer = ProductDetailSerializer(product)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_one_product_404(self):
        """Test retrieving a non-existent product."""
        category = Category.objects.create(name="Shirts")

        product = Product.objects.create(
            name="Classic Shirt1", price=50.0, category=category
        )

        # 999 is non-existent
        url = get_product_detail_url(999)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_filtering_by_category(self):
        """Test filtering products by category"""
        category = Category.objects.create(name="Shirts")
        Product.objects.create(name="Classic Shirt1", price=50.0, category=category)
        Product.objects.create(name="Classic Shirt2", price=50.0, category=category)

        category2 = Category.objects.create(name="Shoes")
        Product.objects.create(name="Classic Shoes", price=50.0, category=category2)

        url = PRODUCTS_URL + f"?category={category.name}"
        res = self.client.get(url)

        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_filtering_by_color(self):
        """Test filtering products by color"""

        test_colors = ["white", "blue"]
        test_colors2 = ["magenta"]

        category = Category.objects.create(name="Shirts")
        Product.objects.create(
            name="Classic Shirt1", price=50.0, category=category, colors=test_colors
        )
        Product.objects.create(
            name="Classic Shirt2", price=50.0, category=category, colors=test_colors
        )
        Product.objects.create(
            name="Magenta Shirt", price=50.0, category=category, colors=test_colors2
        )

        url = PRODUCTS_URL + f"?color={test_colors[0]}"
        res = self.client.get(url)

        products = Product.objects.filter(colors__icontains=test_colors[0])
        serializer = ProductSerializer(products, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_filtering_by_props(self):
        """Test filtering products by properties"""
        test_props = {"ram": "8GB", "ssd": "256GB"}
        test_props2 = {"ram": "16GB", "ssd": "512GB"}

        category = Category.objects.create(name="Desktop PCs")
        Product.objects.create(
            name="PC1", price=50.0, category=category, props=test_props
        )
        Product.objects.create(
            name="PC2", price=50.0, category=category, props=test_props
        )
        Product.objects.create(
            name="PC3", price=50.0, category=category, props=test_props2
        )
        Product.objects.create(
            name="PC4", price=50.0, category=category, props=test_props2
        )

        # Filtering by the RAM parameter
        url = PRODUCTS_URL + f"?ram={test_props['ram']}"
        res = self.client.get(url)

        products = Product.objects.filter(props__RAM__iexact=test_props["ram"])
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

        # Filtering by the SSD parameter
        url = PRODUCTS_URL + f"?ssd={test_props['ssd']}"
        res = self.client.get(url)

        products = Product.objects.filter(props__SSD__iexact=test_props["ssd"])
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
