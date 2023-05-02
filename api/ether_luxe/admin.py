from django.contrib import admin
from .models import Chain, Collection, Token, SaleToken, Message
from django_object_actions import DjangoObjectActions

import requests

@admin.register(Chain)
class ChainAdmin(admin.ModelAdmin):
    pass


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    pass


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    list_display = ('collection', 'kind', 'name', 'description', 'image_uri', 'contract_token_id',
                    'owner', 'level', 'creation_time', 'last_update',)
    search_fields = ('kind', 'name', 'collection__name', 'contract_token_id')


@admin.register(SaleToken)
class SaleTokenAdmin(admin.ModelAdmin):
    list_display = ('collection', 'kind', 'name', 'description', 'image_uri', 'price', 'creation_time', 'last_update',)
    search_fields = ('kind', 'name', 'collection__name')


@admin.register(Message)
class MessageAdmin(DjangoObjectActions, admin.ModelAdmin):
    def mail_token_holders(self, request, queryset):
        self.message_user(request, "All token holders have been notified!")
    changelist_actions = ('mail_token_holders', )


