from rest_framework import generics, status, permissions
from rest_framework.views import APIView    
from django.contrib.auth import authenticate, login, logout 
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import MunicipioSerializer, EmpresaSerializer, UserSerializer
from .models import Municipio, Empresa

# Create your views here.

#### Vista para creacion de usuarios####
#### se utiliza CreateAPIView que es solamente para metodos POST####
class UserCreate(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer
    
###Login al aplicativo#####
class LoginView(APIView):
    permission_classes = ()

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
            # return Response({"token": user.auth_token.key})
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
            #return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)
## Cerrar sesion #####
class LogoutView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        # Borramos de la request la información de sesión
        logout(request)

        # Devolvemos la respuesta al cliente
        return Response(status=status.HTTP_200_OK)

#### Vista para gestion de municipios####
class MunicipioView(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    serializer_class = MunicipioSerializer
    queryset = Municipio.objects.all()

#### Vista para gestion de empresas####
class EmpresaViewset(viewsets.ModelViewSet):
    #authentication_classes = [SessionAuthentication, BasicAuthentication]
    #permission_classes = [IsAuthenticated]
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
