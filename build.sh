#!/usr/bin/env bash
# exit on error
set -o errexit

# Frontend build
echo "Building frontend..."
npm install
npm run build

# Backend dependencies
echo "Installing backend dependencies..."
pip install -r backend/requirements.txt

echo "Running database migrations..."
# The FLASK_APP environment variable needs to be set for this to work
export FLASK_APP=backend/app.py
flask db upgrade