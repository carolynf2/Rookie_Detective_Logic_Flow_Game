#!/bin/bash

echo ""
echo "========================================"
echo "Mystery Detective Agency: Logic Flow"
echo "========================================"
echo ""
echo "Starting local development server..."
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "Using Python to serve the game..."
    echo ""
    echo "Game will be available at: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    echo "Using Python to serve the game..."
    echo ""
    echo "Game will be available at: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8080
# Check if Node.js is installed
elif command -v node &> /dev/null; then
    echo "Python not found, trying Node.js..."
    echo ""
    
    # Check if http-server is installed globally
    if command -v http-server &> /dev/null; then
        echo "Using http-server..."
    else
        echo "Installing http-server..."
        npm install -g http-server
    fi
    
    echo ""
    echo "Game will be available at: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    http-server . -p 8080 -o
else
    echo ""
    echo "ERROR: Neither Python nor Node.js was found on your system."
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3.6+ (https://python.org)"
    echo "  - Node.js 14+ (https://nodejs.org)"
    echo ""
    echo "Alternatively, you can simply open 'index.html' in your web browser."
    echo ""
    exit 1
fi

echo ""
echo "Thanks for playing Mystery Detective Agency!"
echo ""