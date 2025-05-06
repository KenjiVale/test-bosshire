#!/bin/bash

# Check if .env file exists
if [ -f .env ]; then
    echo ".env file already exists. Do you want to overwrite it? (y/n)"
    read answer
    if [ "$answer" != "y" ]; then
        echo "Aborted."
        exit 1
    fi
fi

# Create or overwrite .env file
echo "NEXT_PUBLIC_FAKE_STORE_API_URL=https://fakestoreapi.com" > .env

# Make the file readable
chmod 644 .env

echo "Environment file created successfully!"
echo "Contents of .env:"
cat .env 