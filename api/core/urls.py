from django.contrib import admin
from django.conf.urls import include
from django.urls import re_path

from rest_framework_extensions.routers import ExtendedDefaultRouter

from profiles.urls import profiles_router
from sheets.urls import sheets_router

router = ExtendedDefaultRouter()

router.register(*profiles_router)
router.register(*sheets_router)

urlpatterns = [
    re_path(r"admin/", admin.site.urls),
    re_path(r"auth/", include("auth.urls")),
    re_path(r"v1/", include(router.urls)),
]
