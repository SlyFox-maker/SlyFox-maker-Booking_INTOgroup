from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import employee_table, account_table, employee_account

class creationNewUserAdminWithAccount(UserCreationForm):
    class Meta:
        model = employee_table
        fields = ['username', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'
            field.widget.attrs['placeholder'] = field.label

    def save(self, commit=True):
        # Сохраняем пользователя
        user = super().save(commit=False)
        if commit:
            user.save()

            # Создание записи в таблице account_table (организация)
            organization_name = self.cleaned_data.get('username')
            account = account_table.objects.create(
                name=organization_name
            )

            # Создание записи в таблице employee_account для связи пользователя и аккаунта
            employee_account.objects.create(
                employee_id=user.employee_id,  # связываем по ID пользователя
                account_id=account.account_id  # связываем с созданным аккаунтом
            )
        return user