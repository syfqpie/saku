from rest_framework.permissions import BasePermission


class SheetOwnerOnlyPermission(BasePermission):
    """
    Base model permission, each user types has their
    own permission based on actions
    """

    def has_object_permission(self, request, view, obj):
        return request.user.related_profile == obj.created_by
