#!/bin/bash

# iShop4U Application Startup Script
echo "🚀 Starting iShop4U Application..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null
}

echo -e "${BLUE}📦 Setting up Backend (Flask)...${NC}"
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

# Kill any existing backend process
echo "Stopping any existing backend processes..."
pkill -f "python app.py" 2>/dev/null

# Start backend server in background
echo -e "${GREEN}🖥️  Starting Flask backend server on port 5555...${NC}"
nohup python app.py > ../backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend started successfully
if check_port 5555; then
    echo -e "${GREEN}✅ Backend is running on http://localhost:5555${NC}"
else
    echo -e "${RED}❌ Failed to start backend server${NC}"
    exit 1
fi

# Go back to project root
cd ..

echo -e "${BLUE}⚛️  Setting up Frontend (React + Vite)...${NC}"

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo -e "${GREEN}🌐 Starting React development server on port 5173...${NC}"
echo -e "${BLUE}📱 Your application will be available at:${NC}"
echo -e "${GREEN}   Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}   Backend:  http://localhost:5555${NC}"
echo ""
echo -e "${BLUE}🎯 Features to test:${NC}"
echo "   • Enhanced Homepage with modern design"
echo "   • Shop with 96 real products and search/filtering" 
echo "   • Cart with Formik validation"
echo "   • Multi-step checkout with form validation"
echo "   • Professional dashboard with analytics"
echo ""
echo -e "${RED}📝 Note: Press Ctrl+C to stop the development server${NC}"
echo -e "${RED}📝 Backend will continue running in background (PID: $BACKEND_PID)${NC}"
echo ""

# Start frontend (this will block)
npm run dev