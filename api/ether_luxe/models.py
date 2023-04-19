from django.db.models import Model, IntegerField, CharField, DateTimeField, PositiveBigIntegerField


class Chain(Model):
    chain_id = IntegerField(unique=True)
    rpc_url = CharField()
    last_indexed_block = PositiveBigIntegerField(default=0)
    creation_time = DateTimeField(auto_now_add=True)
    last_update = DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.chain_id}({self.rpc_url}), last block({self.last_indexed_block})'
