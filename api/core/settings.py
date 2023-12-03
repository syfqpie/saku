import os
from datetime import timedelta
from pathlib import Path
from decouple import config


# Build paths inside the project like this: BASE_DIR / "subdir".
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY") # keep the secret key used in production secret!
DEBUG = config("DEBUG", default=False, cast=bool) # no debug in production!
USE_MAILHOG = config("MAILHOG", default=False, cast=bool) # no in production!
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="", cast=lambda v: [s.strip() for s in v.split(",")])

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",

    "rest_framework",
    "rest_framework.authtoken",
    "allauth",
    "allauth.account",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "django_filters",

    "users",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "templates")
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "core.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DEFAULT_DATABASE = {
    "ENGINE": "django.db.backends.sqlite3",
    "NAME": BASE_DIR / "db.sqlite3",
}

DATABASES = {
    "default": DEFAULT_DATABASE
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static/")

# Media files
# https://docs.djangoproject.com/en/4.2/ref/settings/#std-setting-MEDIA_ROOT

MEDIA_URL = "media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media/")

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Authentication backends
# https://docs.djangoproject.com/en/4.2/topics/auth/customizing/#specifying-authentication-backends

AUTHENTICATION_BACKENDS = [
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
]

# Sites framework
# https://docs.djangoproject.com/en/4.2/ref/contrib/sites/
# refer to <root>/api/users/migrations/0001_initial.py
SITE_ID = 1
DEFAULT_SITE_DOMAIN = config("SITE_DOMAIN", "saku.cendol.dev")
DEFAULT_SITE_NAME = config("SITE_NAME", "Saku")

# Django Rest Framework
# https://www.django-rest-framework.org/

DEFAULT_RENDERER_CLASSES = [
    "rest_framework.renderers.JSONRenderer",
]

if DEBUG:
    DEFAULT_RENDERER_CLASSES.append("rest_framework.renderers.BrowsableAPIRenderer")

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_RENDERER_CLASSES": DEFAULT_RENDERER_CLASSES,
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

# Dj-Rest-Auth
# https://dj-rest-auth.readthedocs.io/en/latest/configuration.html

REST_AUTH = {
    "OLD_PASSWORD_FIELD_ENABLED": True,
    "SESSION_LOGIN": False,
    "USE_JWT": True,
    # "JWT_SERIALIZER_WITH_EXPIRATION": "auth.tokens.CoreJWTSerializer",
    # "JWT_TOKEN_CLAIMS_SERIALIZER": "auth.tokens.CoreTokenObtainPairSerializer",
    "JWT_AUTH_HTTPONLY": False, # TODO: check back when doing impementation
    "JWT_AUTH_RETURN_EXPIRATION": True,
}