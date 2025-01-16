from django.shortcuts import render

def home_page(request):
    # Проверяем, вошел ли пользователь в систему
    username = request.user.username if request.user.is_authenticated else None

    # Передаем имя пользователя в контекст
    return render(request, 'home/home_page.html', {'username': username})