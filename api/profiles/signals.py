from django.db.models.signals import post_save
from django.dispatch import receiver

from profiles.models import Profile
from users.models import User 
 

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """
    Each time User is created, a Profile linked
    to the User will be created
    """

    if created:
        Profile.objects.create(user=instance)
