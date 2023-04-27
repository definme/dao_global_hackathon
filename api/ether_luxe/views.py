import json

from rest_framework import views, renderers, response, viewsets
from django_filters import rest_framework, FilterSet, CharFilter

from .models import Token, SaleToken
from .serializer import TokenSerializer, SaleTokenSerializer


class CharacterMetadataView(views.APIView):
    renderer_classes = [renderers.JSONRenderer]
    http_method_names = ['get', 'options', 'head']

    def get(self, request, *args, **kwargs):
        default_meta = {
            0x0000: 'character1.json',
            0x0001: 'character2.json',
            0x0002: 'character3.json',
            0x0003: 'character4.json',
        }
        token_id = self.kwargs.get('contract_token_id', None)
        if len(token_id) < 60:
            int_token_id = int(token_id)
        else:
            int_token_id = int(token_id, 16)

        token_kind = (0xffff0000 & int_token_id) >> 16
        json_path = f'ether_luxe/metadata/{default_meta[token_kind]}'

        with open(json_path) as json_file:
            data = json.load(json_file)

        return response.Response(data)


class TransportMetadataView(views.APIView):
    renderer_classes = [renderers.JSONRenderer]
    http_method_names = ['get', 'options', 'head']

    def get(self, request, *args, **kwargs):
        default_meta = {
            0x0000: 'transport1.json',
            0x0001: 'transport2.json',
            0x0002: 'transport3.json',
            0x0003: 'transport4.json',
        }
        token_id = self.kwargs.get('contract_token_id', None)
        if len(token_id) < 60:
            int_token_id = int(token_id)
        else:
            int_token_id = int(token_id, 16)

        token_kind = (0xffff0000 & int_token_id) >> 16
        json_path = f'ether_luxe/metadata/{default_meta[token_kind]}'

        with open(json_path) as json_file:
            data = json.load(json_file)

        return response.Response(data)


class WeaponMetadataView(views.APIView):
    renderer_classes = [renderers.JSONRenderer]
    http_method_names = ['get', 'options', 'head']

    def get(self, request, *args, **kwargs):
        default_meta = {
            0x0000: 'weapon1.json',
            0x0001: 'weapon2.json',
            0x0002: 'weapon3.json',
            0x0003: 'weapon4.json',
        }
        token_id = self.kwargs.get('contract_token_id', None)
        if len(token_id) < 60:
            int_token_id = int(token_id)
        else:
            int_token_id = int(token_id, 16)

        token_kind = (0xffff0000 & int_token_id) >> 16
        json_path = f'ether_luxe/metadata/{default_meta[token_kind]}'

        with open(json_path) as json_file:
            data = json.load(json_file)

        return response.Response(data)


class TokenFilter(FilterSet):
    owner = CharFilter(field_name='owner')
    collection_address = CharFilter(field_name='collection__contract_address')
    collection_name = CharFilter(field_name='collection__name')
    token_name = CharFilter(field_name='name')
    contract_token_id = CharFilter(field_name='contract_token_id')
    kind = CharFilter(field_name='kind')


class TokenViewSet(viewsets.ModelViewSet):
    http_method_names = ["get", "options", "head"]
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    filter_backends = [rest_framework.DjangoFilterBackend]
    filterset_class = TokenFilter


class SaleTokenFilter(FilterSet):
    collection_address = CharFilter(field_name='collection__contract_address')
    collection_name = CharFilter(field_name='collection__name')
    token_name = CharFilter(field_name='name')
    kind = CharFilter(field_name='kind')


class SaleTokenViewSet(viewsets.ModelViewSet):
    http_method_names = ["get", "options", "head"]
    queryset = SaleToken.objects.all()
    serializer_class = SaleTokenSerializer
    filter_backends = [rest_framework.DjangoFilterBackend]
    filterset_class = SaleTokenFilter
