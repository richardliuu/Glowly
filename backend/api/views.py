from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai

openai.api_key = 'YOUR_OPENAI_API_KEY'

@csrf_exempt
def get_mental_health_resources(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            issue = data.get('mental_health_issue')

            if not issue:
                return JsonResponse({'error': 'Mental health issue is required'}, status=400)

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that provides mental health resources."},
                    {"role": "user", "content": f"Give me mental health resources for {issue}."}
                ],
                max_tokens=500
            )

            resources = response['choices'][0]['message']['content'].strip()

            return JsonResponse({'resources': resources})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
