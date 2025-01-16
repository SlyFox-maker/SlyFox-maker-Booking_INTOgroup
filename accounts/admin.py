from django.contrib import admin
from .models import employee_table, account_table, employee_account

admin.site.register(employee_table)
admin.site.register(account_table)
admin.site.register(employee_account)