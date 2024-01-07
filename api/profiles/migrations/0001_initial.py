# Generated by Django 5.0 on 2023-12-30 13:12

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('last_modified_at', models.DateTimeField(auto_now=True, verbose_name='last modified at')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='related_profile', to=settings.AUTH_USER_MODEL, verbose_name='profile of')),
            ],
            options={
                'ordering': ['user'],
            },
        ),
    ]
