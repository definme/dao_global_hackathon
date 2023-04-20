from django.contrib import admin
from .models import Chain, Collection, Token


@admin.register(Chain)
class ChainAdmin(admin.ModelAdmin):
    pass


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    pass


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    list_display = ('collection', 'kind', 'name', 'image_uri', 'contract_token_id',
                    'owner', 'level', 'creation_time', 'last_update',)
    search_fields = ('kind', 'name', 'collection__name', 'contract_token_id')
