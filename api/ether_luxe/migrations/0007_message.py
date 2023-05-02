# Generated by Django 4.2 on 2023-05-02 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ether_luxe', '0006_alter_token_collection_saletoken'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=255)),
                ('body', models.TextField(blank=True, null=True)),
                ('plane_text', models.TextField(blank=True, null=True)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('last_update', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]