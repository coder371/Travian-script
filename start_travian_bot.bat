@echo off
title Travian Bot
echo ===============================
echo       Starting Travian Bot
echo ===============================

:: Ensure we're in the script directory
cd /d "%~dp0"

:: Run the bot script
node travianBot.js

echo.
echo ===============================
echo    Bot execution finished
echo ===============================
pause