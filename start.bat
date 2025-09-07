@echo off
echo.
echo ========================================
echo Mystery Detective Agency: Logic Flow
echo ========================================
echo.
echo Starting local development server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python to serve the game...
    echo.
    echo Game will be available at: http://localhost:8080
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8080
    goto :end
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python not found, trying Node.js...
    echo.
    echo Installing http-server if needed...
    npm install -g http-server >nul 2>&1
    echo.
    echo Game will be available at: http://localhost:8080
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    http-server . -p 8080 -o
    goto :end
)

REM If neither Python nor Node.js is found
echo.
echo ERROR: Neither Python nor Node.js was found on your system.
echo.
echo Please install one of the following:
echo   - Python 3.6+ (https://python.org)
echo   - Node.js 14+ (https://nodejs.org)
echo.
echo Alternatively, you can simply open 'index.html' in your web browser.
echo.
pause

:end
echo.
echo Thanks for playing Mystery Detective Agency!
echo.
pause