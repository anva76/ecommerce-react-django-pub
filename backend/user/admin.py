from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


class UserAdmin(BaseUserAdmin):
    ordering = ["id"]
    list_display = ["email", "name"]
    readonly_fields = ["last_login"]
    fieldsets = [
        [
            None,
            {
                "fields": [
                    "email",
                    "password",
                    "name",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "last_login",
                ]
            },
        ]
    ]
    add_fieldsets = [
        [
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "email",
                    "password1",
                    "password2",
                    "name",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ],
            },
        ],
    ]


admin.site.register(User, UserAdmin)
