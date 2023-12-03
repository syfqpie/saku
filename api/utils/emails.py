from django.contrib.sites.shortcuts import get_current_site

from core.settings import DEBUG


def generate_context(request, path="", **kwargs):
    """
    Generate a context of type dict for email
    related stuffs with action_url

    Args:
        request: the request
        path: the path to append to, defaults to ""

    Returns:
        dict: context generated
    """
    current_site = get_current_site(request)
    protocol = "http" if DEBUG else "https"

    context = {
        "site_name": current_site.name,
        "site_url": f"{protocol}://{current_site.domain}",
        "action_url": f"{protocol}://{current_site.domain}/{path}",
    } | kwargs # https://peps.python.org/pep-0584/

    return context
