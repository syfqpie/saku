from django.contrib import admin
from django.conf.urls import include
from django.urls import re_path

from rest_framework_extensions.routers import ExtendedDefaultRouter


router = ExtendedDefaultRouter()

urlpatterns = [
    re_path(r"admin/", admin.site.urls),
    re_path(r"auth/", include("auth.urls")),
    re_path(r"v1/", include(router.urls)),
]
