#!/bin/sh

set -e -u

python manage.py migrate

exec "$@"
