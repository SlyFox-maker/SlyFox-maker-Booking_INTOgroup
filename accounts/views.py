from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib import messages
from .forms import creationNewUserAdminWithAccount


def account_register(request):
    if request.user.is_authenticated:
        return redirect("home")
    if request.method == 'POST':
        form = creationNewUserAdminWithAccount(request.POST)
        if form.is_valid():
            # Сохраняем форму, создавая нового пользователя
            form.save()
            messages.success(request, "Аккаунт успешно зарегистрирован!")
            return redirect('login')  # Перенаправляем на страницу входа
    else:
        form = creationNewUserAdminWithAccount()

    return render(request, 'accounts/registration.html', {'form': form})
def account_login(request):
    if request.user.is_authenticated:
        return redirect("home")
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username = username, password = password)

        if user is not None:
            login(request, user)
            messages.success(request, "Вы успешно авторизировались!")
            return redirect("home")
        else:
            messages.error(request, "Неверное имя пользователя или пароль")
    return render(request, "accounts/login.html");

def account_logout(request):
    logout(request)
    messages.success(request, "Вы вышли из системы.")
    return redirect('login')