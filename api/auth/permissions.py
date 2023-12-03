from rest_framework.permissions import BasePermission


class OwnerOnlyPermission(BasePermission):
    """
    Base model permission, each user types has their
    own permission based on actions
    """

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user
