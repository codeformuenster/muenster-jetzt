"""Signed links for redirects to external event websites.

The frontend used to build ``/external/?url=<any url>`` links itself and nginx
redirected to whatever URL it got, which made the site an open redirect.
Now only URLs signed by the backend (HMAC-SHA256 via Django's signing
framework, keyed with ``SECRET_KEY``) are redirected.
"""

from urllib.parse import urlencode, urlsplit

from django.core import signing
from django.urls import reverse
from django.utils.crypto import constant_time_compare

_signer = signing.Signer(salt="events.external-link")

ALLOWED_SCHEMES = ("http", "https")


def is_redirectable(url):
    if not url:
        return False
    parts = urlsplit(url)
    return parts.scheme.lower() in ALLOWED_SCHEMES and bool(parts.netloc)


def sign(url):
    return _signer.signature(url)


def verify(url, signature):
    if not url or not signature:
        return False
    return constant_time_compare(sign(url), signature)


def external_link(url):
    """Relative link to the redirect view, or None for unusable URLs."""
    if not is_redirectable(url):
        return None
    query = urlencode({"url": url, "sig": sign(url)})
    return f"{reverse('external-link')}?{query}"
