from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
import json
from .models import Room, Message
# Create your views here.

def index(request):
    return render(request, 'index.html')

def room(request, room_name):
    username = request.GET.get('username')
    roomObj = Room.objects.get(name=room_name)
    return render(request, 'room.html', {
        'room_name': room_name,
        'username': username,
        'room': roomObj,
    })
    
def checkroom(request):
    room = request.POST['roomname']
    user = request.POST['username']
    if Room.objects.filter(name=room).exists():
        return redirect('/' + room + '/?username=' + user)
    else:
        if request.POST.get('create_room') == "true":
            new_room = Room.objects.create(name=room)
            new_room.save()
            return redirect('/' + room + '/?username=' + user)
        else:
            return redirect('index')
        
def sendMessage(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data['message']
        room_id = data['room_id']
        username = data['username']
        
        newMessageObject = Message.objects.create(
            value=message,
            user=username,
            room=Room.objects.get(id=room_id),
        )
        newMessageObject.save()
        return JsonResponse({'message': 'Message sent successfully!'})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def getMessages(request, room_name):
    if request.method == "GET":
        room = Room.objects.get(name=room_name)
        messages = Message.objects.filter(room=room).order_by('date')
        print(messages)
        # Prepare the response data
        data = [
            {
                'username': msg.user,
                'content': msg.value,
                'timestamp': msg.date.strftime('%Y-%m-%d %H:%M:%S'),
            }
            for msg in messages
        ]
        return JsonResponse({'messages': data})  # Return the messages in JSON format
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
