from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from product.models import Category, Brand
from product.serializers import CategorySerializer, BrandSerializer

CATEGORIES_URL = reverse("product:category-list")
BRANDS_URL = reverse("product:brand-list")


def get_category_detail_url(id):
    return reverse("product:category-detail", args=[id])


class PublicBrandAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_brands(self):
        """Test retrieving all brands"""
        Brand.objects.create(name="Brand1")
        Brand.objects.create(name="Brand2")

        res = self.client.get(BRANDS_URL)

        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


class PublicCategoryAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_categories(self):
        """Test retrieving a list of all categories."""
        Category.objects.create(name="Shirts")
        Category.objects.create(name="Shoes")

        res = self.client.get(CATEGORIES_URL)

        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_one_category(self):
        """Test retrieving a specific category."""
        cat = Category.objects.create(name="Shirts")

        url = get_category_detail_url(cat.id)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["name"], cat.name)

    def test_get_one_category_404(self):
        """Test retrieving a non-existent category."""
        cat = Category.objects.create(name="Shirts")

        # id=999 is non-existent
        url = get_category_detail_url(999)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
