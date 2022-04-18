from django.db import models
#from django.contrib.gis.db import models

# Create your models here.

class Municipio (models.Model):
    codigo_mpio = models.CharField(max_length=5, primary_key=True)
    nombre_mpio = models.CharField(max_length=25, )
    #subregion = models.CharField(max_length=20)
    #vocacion = models.CharField(max_length=20)    

    def __str__(self):
        return self.nombre_mpio


class Empresa (models.Model):
    nit = models.CharField(max_length=12, primary_key=True)
    ciiu = models.CharField(max_length=7, null=True)
    camara = models.CharField(max_length=9, null=True, blank=True)
    razon_social = models.CharField(max_length=96, null=False, blank = False)
    municipio = models.ForeignKey(Municipio, null=False, blank=False, on_delete=models.CASCADE)
    direccion = models.CharField(max_length=96, null=False, blank = False)
    telefono = models.CharField(max_length=16, null=True, blank=True)
    correo = models.EmailField(max_length=64, null=False, blank = False)
    web = models.CharField(max_length=32, null=True, blank=True)
    cedula = models.CharField(max_length=11, null=False, blank=False)
    nombre_rep = models.CharField(max_length=64, null=False, blank=False, verbose_name="Nombre Representante Legal")
    tiposE = [
        ('GRANDE', 'GRANDE'),
        ('MEDIANA' ,'MEDIANA'),
        ('PEQUEÑA', 'PEQUEÑA'),
        ('MICRO', 'MICRO')
    ]
    tipo_empresa = models.CharField(max_length=7, choices=tiposE, default='GRANDE', verbose_name="Su Empresa es:")
    sector_prod = models.CharField(max_length=32, null=True, blank=True)
    fecha_reg = models.DateField(null=True, blank=True)
    fecha_dga = models.DateField(null=True, blank=True)
    nombre_dga = models.CharField(max_length=64, null=False, blank=False)
    tipoestudio = [
        ('TECNICO', 'TECNICO'),
        ('TECNOLOGO' ,'TECNOLOGO'),
        ('PROFESIONAL', 'PROFESIONAL')
    ]
    nivel_estudio = models.CharField(max_length=32, choices=tipoestudio, default='PROFESIONAL')
    titulo = models.CharField(max_length=64, null=True, blank=True)
    cargo = models.CharField(max_length=64, null=False, blank=False)
    tiposDGA = [
         ('INTERNO', 'INTERNO'),
         ('EXTERNO' ,'EXTERNO'),
         ('APOYO GREMIO', 'APOYO GREMIO')
     ]
    tipo_dga = models.CharField(max_length=12, choices=tiposDGA, default='INTERNO', verbose_name="Tipo Departamento Gestion Ambiental")
    email_dga = models.EmailField(max_length=64, null=True, blank=True)
    fecha_regdga = models.DateField(null=True, blank=True)

    def __str__(self):
        txt= "{0} NIT: {1} {2} {3} {4}" 
        return txt.format(self.razon_social, self.nit, self.direccion, self.telefono, self.correo)