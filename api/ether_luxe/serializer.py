from rest_framework.serializers import ModelSerializer
from .models import Collection, Token


class CollectionSerializer(ModelSerializer):
    class Meta:
        fields = ('name', 'contract_address')
        model = Collection


class TokenSerializer(ModelSerializer):
    collection = CollectionSerializer(many=False, read_only=True)

    class Meta:
        fields = ('collection', 'kind', 'name', 'description', 'image_uri', 'contract_token_id',
                  'owner', 'level', 'creation_time', 'last_update')
        model = Token
