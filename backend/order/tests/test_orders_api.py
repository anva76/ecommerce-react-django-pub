import random
import string
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

from product.models import Category, Brand, Product
from order.models import Order, OrderItem
from order.serializers import (
    OrderSerializer,
    OrderDetailSerializer,
    OrderCreateSerializer,
)


ORDERS_URL = reverse("order:order-list")

DEFAULT_ORDER_DATA = {
    "first_name": "Test name",
    "last_name": "Test last name",
    "country": "Test country",
    "email": "user@example.com",
    "phone": "+111 2222 333",
    "street_address_1": "Test address",
    "street_address_2": "Test address",
    "city": "Test city",
    "province": "Test province",
    "postal_code": "123456",
}


def get_random_str(len):
    return "".join(random.choices(string.ascii_uppercase, k=len))


def get_order_detail_url(id):
    return reverse("order:order-detail", args=[id])


def create_user(email="user@example.com", password="testpass456"):
    return get_user_model().objects.create_user(email, password)


def create_order(user):
    category = Category.objects.create(name="Shirts")

    product1 = Product.objects.create(
        name="Classic Shirt1", price=50.0, category=category
    )
    product2 = Product.objects.create(
        name="Classic Shirt2", price=50.0, category=category
    )

    order_data = dict(DEFAULT_ORDER_DATA)
    order_data["user"] = user
    order_data["total_amount"] = 100.0
    order_data["items_count"] = 2
    order_data["order_number"] = get_random_str(5)

    order = Order.objects.create(**order_data)

    OrderItem.objects.create(order=order, product=product1, quantity=1, price=50.0)
    OrderItem.objects.create(order=order, product=product2, quantity=1, price=50.0)

    return order


class PublicOrderAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test auth is required for retrieving orders."""
        res = self.client.get(ORDERS_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateOrderAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_user()
        self.client.force_authenticate(self.user)

    def test_get_all_orders(self):
        """Test retrieving all orders belonging to the current user."""
        # Create orders for the current user
        order1 = create_order(self.user)
        order2 = create_order(self.user)

        # Create an order belonging to another user
        user3 = create_user(email="user3@example.com", password="testpass456")
        order3 = create_order(user3)

        res = self.client.get(ORDERS_URL)

        orders = Order.objects.filter(user=self.user).order_by("-created_at")
        serializer = OrderSerializer(orders, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_one_order(self):
        """Test retrieving a specific order belonging to the current user."""
        order = create_order(self.user)
        serializer = OrderDetailSerializer(order)

        url = get_order_detail_url(order.id)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_orders_belonging_to_user(self):
        """Test retrieving an order belonging to another user is not possible."""
        user2 = create_user(email="user2@example.com", password="testpass456")
        order = create_order(user2)

        url = get_order_detail_url(order.id)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_order(self):
        """Test creating an order via API"""

        # Create test category and products
        category = Category.objects.create(name="Shirts")
        product1 = Product.objects.create(
            name="Classic Shirt1", price=50.0, category=category
        )
        product2 = Product.objects.create(
            name="Classic Shirt2", price=50.0, category=category
        )

        # Create a test order via API
        data = dict(DEFAULT_ORDER_DATA)
        data["order_items"] = [
            {"product_id": product1.id, "quantity": 1},
            {"product_id": product2.id, "quantity": 1},
        ]

        res = self.client.post(ORDERS_URL, data=data, format="json")
        id = res.data["id"]

        order = Order.objects.get(pk=id)
        serializer = OrderCreateSerializer(order)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data, serializer.data)
