import logging
from django import db
from profiles.models import Profile


logger = logging.getLogger(__name__)


def attach_profile_to_user(user):
    try:
        attached_profile = Profile.objects.create(user=user)
        logger.info(f"Profile attached to user with username={user.username}")
    except db.utils.IntegrityError:
        attached_profile = Profile.objects.get(user=user)

    return attached_profile
