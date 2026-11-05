@echo off
rem Locate Node.js: prefer the one on PATH, otherwise fall back to the bundled runtime.
set "NODE="
set "NODE_DIR="

for /f "delims=" %%i in ('where node 2^>nul') do if not defined NODE set "NODE=%%i"

if not defined NODE (
  for /d %%d in ("%USERPROFILE%\.workbuddy\binaries\node\versions\*") do (
    if exist "%%d\node.exe" (
      set "NODE=%%d\node.exe"
      set "NODE_DIR=%%d"
    )
  )
)

if defined NODE_DIR set "PATH=%NODE_DIR%;%PATH%"
