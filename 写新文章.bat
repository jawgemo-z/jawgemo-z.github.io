@echo off
chcp 65001 >nul
cd /d "%~dp0"
call tools\env.bat
if not defined NODE (
  echo.
  echo   Node.js not found. Please install Node.js first: https://nodejs.org
  echo.
  pause
  exit /b 1
)
"%NODE%" tools\new-post.js
echo.
pause
