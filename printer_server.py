# from flask import Flask, request, jsonify
# import os
# import win32print

# app = Flask(__name__)


# def print_file(file_path):
#     printer_name = win32print.GetDefaultPrinter()
#     hPrinter = win32print.OpenPrinter(printer_name)
    
#     try:
#         job_info = (str(file_path), file_path, "RAW")  # 세 번째 인수는 3개의 항목이 있는 튜플로 설정합니다.
        
#         hJob = win32print.StartDocPrinter(hPrinter, 1, job_info)
#         win32print.StartPagePrinter(hPrinter)
        
#         with open(file_path, "rb") as f:
#             data = f.read()
#             if data:
#                 win32print.WritePrinter(hPrinter, data)
#             else:
#                 print("Error: The file data is empty.")
        
#         win32print.EndPagePrinter(hPrinter)
#         win32print.EndDocPrinter(hPrinter)
    
#     finally:
#         win32print.ClosePrinter(hPrinter)

# # def print_file(file_path):
# #     printers = win32print.EnumPrinters(win32print.PRINTER_ENUM_LOCAL | win32print.PRINTER_ENUM_CONNECTIONS)
# #     printer_list = [{'name': printer[2]} for printer in printers]
# #     print(printer_list)
# #     printer_name = win32print.GetDefaultPrinter()
# #     print(printer_name)
# #     hPrinter = win32print.OpenPrinter(printer_name)
    
# #     job_info = ("Print Document", None, "RAW")  # 세 번째 인수는 3개의 항목이 있는 튜플이어야 합니다.
    
# #     hJob = win32print.StartDocPrinter(hPrinter, 1, job_info)
# #     win32print.StartPagePrinter(hPrinter)
    
# #     with open(file_path, "rb") as f:
# #         data = f.read()
# #         win32print.WritePrinter(hPrinter, data)
    
# #     win32print.EndPagePrinter(hPrinter)
# #     win32print.EndDocPrinter(hPrinter)
# #     win32print.ClosePrinter(hPrinter)

#     # try:
#     #     job_info = ("Print Document", None, "RAW")  # 세 번째 인수는 3개의 항목이 있는 튜플이어야 합니다.
        
#     #     hJob = win32print.StartDocPrinter(hPrinter, 1, job_info)
#     #     win32print.StartPagePrinter(hPrinter)
        
#     #     with open(file_path, "rb") as f:
#     #         data = f.read()
#     #         win32print.WritePrinter(hPrinter, data)
        
#     #     win32print.EndPagePrinter(hPrinter)
#     #     win32print.EndDocPrinter(hPrinter)
    
#     # finally:
#     #     win32print.ClosePrinter(hPrinter)

# @app.route('/api/switch-printer/<printer_model>/<frame_type>/', methods=['POST'])
# def switch_printer(printer_model, frame_type):
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
    
#     folder_path = "C:\\Users\\USER\\Desktop\\DeepSoft\\Project\\포토키오스크\\photomong\\print_files"
#     if not os.path.exists(folder_path):
#         os.makedirs(folder_path)

#     file_path = os.path.join(folder_path, file.filename)
#     file.save(file_path)
    
#     # 프린터 제어 로직 호출
#     print_file(file_path)
    
#     return jsonify({'status': 'success', 'message': 'Print job started successfully.'})

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=8001)


import os
import subprocess
import tempfile
import werkzeug
import logging
from flask import Flask, request, jsonify
from PIL import Image
import win32print

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

def print_image_with_rundll32(image_path):
    try:
        # Use rundll32 to print the image
        printer_name = win32print.GetDefaultPrinter()
        print_command = f'rundll32.exe C:\\Windows\\System32\\shimgvw.dll,ImageView_PrintTo /pt "{image_path}" "{printer_name}"'
        logging.debug(f"Executing print command: {print_command}")
        subprocess.run(print_command, check=True, shell=True)
        logging.debug(f"Print command sent for file: {image_path}")
    except subprocess.CalledProcessError as e:
        logging.error(f"Error printing file: {e}")
        raise

@app.route('/api/switch-printer/<printer_model>/<frame_type>/', methods=['POST'])
def switch_printer(printer_model, frame_type):
    print(request.files)
    print(request)
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    safe_filename = werkzeug.utils.secure_filename(file.filename)
    temp_dir = tempfile.gettempdir()
    file_path = os.path.join(temp_dir, safe_filename)
    file.save(file_path)


    print(file_path)
    try:
        # Print the image file
        print_image_with_rundll32(file_path)
    except Exception as e:
        logging.error(f"Error processing print job: {e}")
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(file_path)
    
    return jsonify({'status': 'success', 'message': 'Print job started successfully.'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8001)
