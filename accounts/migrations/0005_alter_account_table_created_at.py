# Generated by Django 5.1.4 on 2025-01-15 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_employee_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account_table',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
