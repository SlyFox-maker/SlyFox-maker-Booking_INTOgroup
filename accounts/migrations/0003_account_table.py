# Generated by Django 5.1.4 on 2025-01-15 02:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_employee_table_delete_customuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='account_table',
            fields=[
                ('account_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField()),
            ],
        ),
    ]
