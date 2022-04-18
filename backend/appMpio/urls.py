from rest_framework import routers
from appMpio.views import MunicipioView
from appMpio.views import EmpresaViewset, MunicipioView, LoginView

router = routers.DefaultRouter()
router.register('municipios', MunicipioView, basename='municipios')
router.register('empresas', EmpresaViewset, basename='empresas')
