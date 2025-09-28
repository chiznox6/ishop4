#!/usr/bin/env bash
# exit on error
set -o errexit

# Frontend build
npm install
npm run build

# Backend dependencies
pip install -r backend/requirements.txt

# Run database migrations
cd backend
export FLASK_APP=app.py
flask db upgrade
python seed.py