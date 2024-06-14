# # from flask import Flask, request, jsonify
# # import os
# # import win32print

# # app = Flask(__name__)


# # def print_file(file_path):
# #     printer_name = win32print.GetDefaultPrinter()
# #     hPrinter = win32print.OpenPrinter(printer_name)
    
# #     try:
# #         job_info = (str(file_path), file_path, "RAW")  # 세 번째 인수는 3개의 항목이 있는 튜플로 설정합니다.
        
# #         hJob = win32print.StartDocPrinter(hPrinter, 1, job_info)
# #         win32print.StartPagePrinter(hPrinter)
        
# #         with open(file_path, "rb") as f:
# #             data = f.read()
# #             if data:
# #                 win32print.WritePrinter(hPrinter, data)
# #             else:
# #                 print("Error: The file data is empty.")
        
# #         win32print.EndPagePrinter(hPrinter)
# #         win32print.EndDocPrinter(hPrinter)
    
# #     finally:
# #         win32print.ClosePrinter(hPrinter)

# # # def print_file(file_path):
# # #     printers = win32print.EnumPrinters(win32print.PRINTER_ENUM_LOCAL | win32print.PRINTER_ENUM_CONNECTIONS)
# # #     printer_list = [{'name': printer[2]} for printer in printers]
# # #     print(printer_list)
# # #     printer_name = win32print.GetDefaultPrinter()
# # #     print(printer_name)
# # #     hPrinter = win32print.OpenPrinter(printer_name)
    
# # #     job_info = ("Print Document", None, "RAW")  # 세 번째 인수는 3개의 항목이 있는 튜플이어야 합니다.
    
# # #     hJob = win32print.StartDocPrinter(hPrinter, 1, job_info)
# # #     win32print.StartPagePrinter(hPrinter)
    
# # #     with open(file_path, "rb") as f:
# # #         data = f.read()
# # #         win32print.WritePrinter(hPrinter, data)
    
# # #     win32print.EndPagePrinter(hPrinter)
# # #     win32print.EndDocPrinter(hPrinter)
# # #     win32print.ClosePrinter(hPrinter)

# #     # try:
# #     #     job_info = ("Print Document", None, "RAW")  # 세 번째 인수는 3개의 항목이 있는 튜플이어야 합니다.
        
# #     #     hJob = win32print.StartDocPrinter(hPrinter, 1, job_info)
# #     #     win32print.StartPagePrinter(hPrinter)
        
# #     #     with open(file_path, "rb") as f:
# #     #         data = f.read()
# #     #         win32print.WritePrinter(hPrinter, data)
        
# #     #     win32print.EndPagePrinter(hPrinter)
# #     #     win32print.EndDocPrinter(hPrinter)
    
# #     # finally:
# #     #     win32print.ClosePrinter(hPrinter)

# # @app.route('/api/switch-printer/<printer_model>/<frame_type>/', methods=['POST'])
# # def switch_printer(printer_model, frame_type):
# #     if 'file' not in request.files:
# #         return jsonify({'error': 'No file part'}), 400
    
# #     file = request.files['file']
# #     if file.filename == '':
# #         return jsonify({'error': 'No selected file'}), 400
    
# #     folder_path = "C:\\Users\\USER\\Desktop\\DeepSoft\\Project\\포토키오스크\\photomong\\print_files"
# #     if not os.path.exists(folder_path):
# #         os.makedirs(folder_path)

# #     file_path = os.path.join(folder_path, file.filename)
# #     file.save(file_path)
    
# #     # 프린터 제어 로직 호출
# #     print_file(file_path)
    
# #     return jsonify({'status': 'success', 'message': 'Print job started successfully.'})

# # if __name__ == '__main__':
# #     app.run(host='127.0.0.1', port=8001)


# import os
# import subprocess
# import tempfile
# import werkzeug
# import logging
# from flask import Flask, request, jsonify
# from PIL import Image
# import win32print

# app = Flask(__name__)
# logging.basicConfig(level=logging.DEBUG)

# def print_image_with_rundll32(image_path):
#     try:
#         # Use rundll32 to print the image
#         printer_name = win32print.GetDefaultPrinter()
#         print_command = f'rundll32.exe C:\\Windows\\System32\\shimgvw.dll,ImageView_PrintTo /pt "{image_path}" "{printer_name}"'
#         logging.debug(f"Executing print command: {print_command}")
#         subprocess.run(print_command, check=True, shell=True)
#         logging.debug(f"Print command sent for file: {image_path}")
#     except subprocess.CalledProcessError as e:
#         logging.error(f"Error printing file: {e}")
#         raise

# @app.route('/api/switch-printer/<printer_model>/<frame_type>/', methods=['POST'])
# def switch_printer(printer_model, frame_type):
#     print(request.files)
#     print(request)
    
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
    
#     safe_filename = werkzeug.utils.secure_filename(file.filename)
#     temp_dir = tempfile.gettempdir()
#     file_path = os.path.join(temp_dir, safe_filename)
#     file.save(file_path)


#     print(file_path)
#     try:
#         # Print the image file
#         print_image_with_rundll32(file_path)
#     except Exception as e:
#         logging.error(f"Error processing print job: {e}")
#         return jsonify({'error': str(e)}), 500
#     finally:
#         os.remove(file_path)
    
#     return jsonify({'status': 'success', 'message': 'Print job started successfully.'})

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=8001)



import os
import subprocess
import tempfile
import werkzeug
import logging
from flask import Flask, request, jsonify
import win32print
import requests

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

def print_image_with_rundll32(image_path, device_id, frame_type, num_copies=1):
    try:
        # Use rundll32 to print the image
        printer_name = win32print.GetDefaultPrinter()
        for _ in range(num_copies):
            print_command = f'rundll32.exe C:\\Windows\\System32\\shimgvw.dll,ImageView_PrintTo /pt "{image_path}" "{printer_name}"'
            logging.debug(f"Executing print command: {print_command}")
            subprocess.run(print_command, check=True, shell=True)
            logging.debug(f"Print command sent for file: {image_path}")

        # 매출 업데이트 요청 보내기
        update_sales(device_id, num_copies,frame_type)
    except subprocess.CalledProcessError as e:
        logging.error(f"Error printing file: {e}")
        raise

def update_sales(device_id, num_copies,frame_type):
    device_id = 34
    if frame_type == "Stripx2" :
        default_price=70000
        pass
    elif frame_type == "2cut-x2" :
        default_price=100000
        pass
    elif frame_type == "4-cutx2" :
        default_price=100000
        pass
    elif frame_type == "6-cutx2" :
        default_price=100000
        pass
    try:
        # 9000번 서버 주소
        server_url = "http://127.0.0.1:9000"

        # 디바이스 정보 가져오기
        response = requests.get(f"{server_url}/api/devices")
        devices = response.json()

        # 해당 디바이스 찾기
        device = next((d for d in devices if d['id'] == device_id), None)
        if device:
            updated_device = {
                'name': device['name'],
                'device_code': device['device_code'],
                'remaining_amount': str(int(device['remaining_amount']) - int(num_copies)),
                'sales': str(int(device['sales']) + default_price + 50000 * num_copies ),
                'promotion_codes': device['promotion_codes']
            }

            # 디바이스 정보 업데이트 요청
            requests.put(f"{server_url}/api/edit_device/{device_id}", json=updated_device)
        else:
            logging.error(f"Device with ID {device_id} not found.")
    except requests.RequestException as e:
        logging.error(f"Error updating sales: {e}")

@app.route('/api/switch-printer/<printer_model>/<frame_type>/', methods=['POST'])
# @app.route('/api/switch-printer/<int:device_id>/<printer_model>/<frame_type>/', methods=['POST'])
def switch_printer(printer_model, frame_type):
    device_id = 34 
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    num_copies = int(request.form.get('num_copies', 1))  # 기본값을 1로 설정

    safe_filename = werkzeug.utils.secure_filename(file.filename)
    temp_dir = tempfile.gettempdir()
    file_path = os.path.join(temp_dir, safe_filename)
    file.save(file_path)

    try:
        # Print the image file
        print_image_with_rundll32(file_path, device_id, frame_type, num_copies)
    except Exception as e:
        logging.error(f"Error processing print job: {e}")
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(file_path)
    
    return jsonify({'status': 'success', 'message': 'Print job started successfully.'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8001)
