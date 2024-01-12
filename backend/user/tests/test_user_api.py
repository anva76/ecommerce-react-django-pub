from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse("user:create")
TOKEN_URL = reverse("user:token")
ME_URL = reverse("user:me")


def create_user(**params):
    """Create a user."""

    return get_user_model().objects.create_user(**params)


class PublicUserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_user(self):
        """Test creating a user is successful"""

        data = {
            "email": "user@example.com",
            "password": "testpass567",
            "name": "Test Name",
        }

        res = self.client.post(CREATE_USER_URL, data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=data["email"])
        self.assertTrue(user.check_password(data["password"]))
        self.assertNotIn("password", res.data)

    def test_user_with_email_exists_error(self):
        """Test error returned if user with email exists."""
        data = {
            "email": "test@example.com",
            "password": "testpass123",
            "name": "Test Name",
        }
        create_user(**data)

        res = self.client.post(CREATE_USER_URL, data)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_short_error(self):
        """Test if error is return if password is less than 5 chars."""

        data = {
            "email": "test@example.com",
            "password": "pw",
            "name": "Test Name",
        }

        res = self.client.post(CREATE_USER_URL, data)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(email=data["email"]).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test token generation for valid credentials."""
        user_details = {
            "name": "Test Name",
            "email": "test@example.com",
            "password": "testpass456",
        }
        create_user(**user_details)

        data = {
            "email": "test@example.com",
            "password": "testpass456",
        }

        res = self.client.post(TOKEN_URL, data)

        self.assertIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_bad_credentials(self):
        """Test if error is returned if credentials are invalid."""

        create_user(email="test@example.com", password="goodpass")

        data = {"email": "test@example.com", "password": "badpass"}

        res = self.client.post(TOKEN_URL, data)
        self.assertNotIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_blank_password(self):
        """Test posting a blank password returns an error."""
        data = {
            "email": "test@example.com",
            "password": "",
        }

        res = self.client.post(TOKEN_URL, data)

        self.assertNotIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retreive_user_unauthorized(self):
        """Test authentication is required for users."""

        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):
    """Test API requests that require authentication."""

    def setUp(self):
        self.user = create_user(
            email="test@example.com",
            password="testpass678",
            name="Test Name",
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retreive_profile_success(self):
        """Test retreiving the profile of a logged in user."""

        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {"email": self.user.email, "name": self.user.name})

    def test_post_me_not_allowed(self):
        """Test POST is not allowed for the me endpoint."""

        res = self.client.post(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test updating the user profile of an authenticated user."""

        data = {"name": "Update Name", "password": "newpass678"}

        res = self.client.patch(ME_URL, data)
        self.user.refresh_from_db()

        self.assertEqual(self.user.name, data["name"])
        self.assertTrue(self.user.check_password(data["password"]))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
