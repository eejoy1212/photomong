from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

@csrf_exempt
def get_photos(request):
    if request.method == 'GET':
        upload_dir = os.path.join('uploads')  # 파일을 저장할 디렉터리 경로 설정
        # 디렉터리 내의 모든 파일 목록을 가져옴
        try:
            file_list = os.listdir(upload_dir)
            # 이미지 파일만 필터링 (예: JPEG, PNG 파일)
            images = [file for file in file_list if file.lower().endswith(('.png', '.jpg', '.jpeg'))]
            image_urls = [{'id': idx, 'url': os.path.join(request.build_absolute_uri(), upload_dir, image)} for idx, image in enumerate(images)]
            return JsonResponse({'status': 'success', 'images': image_urls})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

from django.http import HttpResponse, Http404
from urllib.parse import quote

@csrf_exempt    
def serve_photo(request, file_path):
    file_path = os.path.join('uploads', file_path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type="image/jpeg")
            response['Content-Disposition'] = f'inline; filename={quote(os.path.basename(file_path))}'
            return response
    else:
        raise Http404("File not found")