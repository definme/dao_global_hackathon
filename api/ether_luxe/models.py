from django.db.models import Model, IntegerField, CharField, DateTimeField, PositiveBigIntegerField, DecimalField, \
    ForeignKey, CASCADE, TextField


class Chain(Model):
    chain_id = IntegerField(unique=True)
    rpc_url = CharField()
    last_indexed_block = PositiveBigIntegerField(default=0)
    last_indexed_block_collection = PositiveBigIntegerField(default=0)
    creation_time = DateTimeField(auto_now_add=True)
    last_update = DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.chain_id}({self.rpc_url}), last block({self.last_indexed_block})'


class Collection(Model):
    name = CharField(max_length=255)
    contract_address = CharField(max_length=255)
    creation_time = DateTimeField(auto_now_add=True)
    last_update = DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} - {self.contract_address}'


class Token(Model):
    collection = ForeignKey(Collection, related_name='user_token', on_delete=CASCADE)
    kind = DecimalField(max_digits=80, decimal_places=0)
    name = CharField(max_length=255)
    description = TextField(blank=True, null=True)
    image_uri = CharField(max_length=255)
    contract_token_id = DecimalField(max_digits=80, decimal_places=0)
    owner = CharField(max_length=255)
    level = IntegerField(default=1)
    creation_time = DateTimeField(auto_now_add=True)
    last_update = DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} {self.contract_token_id}'


class SaleToken(Model):
    collection = ForeignKey(Collection, related_name='sale_token', on_delete=CASCADE)
    kind = DecimalField(max_digits=80, decimal_places=0)
    name = CharField(max_length=255)
    description = TextField(blank=True, null=True)
    image_uri = CharField(max_length=255)
    price = DecimalField(max_digits=256, decimal_places=0, default=0)
    creation_time = DateTimeField(auto_now_add=True)
    last_update = DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} {self.image_uri}'
