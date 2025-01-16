from django.contrib.auth.models import AbstractUser
from django.db import models

class employee_table(AbstractUser):
    employee_id = models.AutoField(primary_key=True)  # Автоматическое уникальное поле ID
    position = models.CharField(max_length=255, null=True, blank = True)
    ROLE_CHOICES = [
        ('administrator', 'Администратор'),
        ('manager', 'Менеджер'),
        ('executor', 'Исполнитель'),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, null=True, blank = True)
    schedule_code = models.IntegerField(null=True, blank = True)

    def __str__(self):
        return self.username

class account_table(models.Model):
    account_id = models.AutoField(primary_key=True)  # Автоматическое уникальное поле ID
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class employee_account(models.Model):
    employee_id = models.IntegerField()
    account_id = models.IntegerField()


    def __str__(self):
        return str(self.account_id)