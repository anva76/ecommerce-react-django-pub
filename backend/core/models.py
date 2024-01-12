from django.db import models


class BaseModel(models.Model):
    """Base model for db tables."""

    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True
    )
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        abstract = True

    @classmethod
    def get_one_or_none(cls, id):
        item = None
        try:
            item = cls.objects.get(pk=id)
        except cls.DoesNotExist:
            return None

        return item
