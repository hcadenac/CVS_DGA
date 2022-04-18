from django.contrib.auth.models import User
from .models import Municipio, Empresa
from rest_framework import serializers
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user

class MunicipioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipio
        fields = '__all__'
        #fields = ['codigo_mpio', 'nombre_mpio']

class EmpresaSerializer(serializers.ModelSerializer):
    #municipio = MunicipioSerializer()
    municipio=  serializers.PrimaryKeyRelatedField(queryset=Municipio.objects.all())
    #municipio = serializers.StringRelatedField(read_only=True)
    class Meta:
         model = Empresa
         fields = '__all__'

