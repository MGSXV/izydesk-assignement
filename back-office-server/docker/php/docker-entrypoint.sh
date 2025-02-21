#!/bin/sh
set -e

# Check if the project is already initialized
if [ ! -f composer.json ]; then
    composer create-project symfony/skeleton:"6.4.*" .
    composer require symfony/orm-pack
    composer require symfony/maker-bundle --dev
    composer require lexik/jwt-authentication-bundle
    composer require symfony/security-bundle
fi


# First arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
    set -- php-fpm "$@"
fi

exec "$@"