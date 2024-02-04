

FROM php:8.2-fpm-alpine


# Update the Alpine package manager and install necessary packages
RUN apk update && apk add --no-cache \
    bash \
    git \
    curl \
    gcc \
    make \
    wget \
    pkgconf \
    autoconf \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libwebp-dev \
    libxpm-dev \
    libvpx-dev \
    libc-dev \
    oniguruma-dev \
    openssl-dev \
    zip


# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-xpm
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl gd


# Set working directory
WORKDIR /var/www/html


# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


# Start PHP-FPM
CMD ["php-fpm"]


# Expose port 9000
EXPOSE 9000


