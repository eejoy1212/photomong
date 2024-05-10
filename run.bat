@echo off
cd backend
start cmd /k "pip install -r requirements.txt && python manage.py runserver"
cd ../app
start cmd /k "npm install --legacy-peer-deps --force && npm start"
start "C:\Program Files\Google\Chrome\Application\chrome.exe --allow-file-access-from-files --disable-web-security -kiosk -fullscreen"
