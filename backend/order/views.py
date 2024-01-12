from rest_framework import generics, mixins, viewsets
from .models import Order
from .serializers import (
    OrderCreateSerializer,
    OrderSerializer,
    OrderDetailSerializer,
)
from rest_framework import authentication, permissions


class OrderViewSet(
    mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet
):
    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list":
            return OrderSerializer

        return self.serializer_class

    def get_queryset(self):
        queryset = self.queryset
        return queryset.filter(user=self.request.user).order_by("-created_at")


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset
        return queryset.filter(user=self.request.user)
