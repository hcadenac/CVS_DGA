import React from 'react';
import imagen from '../img/gambiental.jpg';



const Inicio = () => {

    return (
        <div className='textdga'>
            <div id='imagenIncio'>
            <img id ='imagen1' src={imagen} alt="aca esta una imagen"/>
            </div>
            <br></br>
            <h2 id="text-titulo" align="center">REGISTRO DEPARTAMENTOS DE GESTION AMBIENTAL DGA</h2>
            <h3 id="text-titulo1">Generalidades</h3>
        <div>
        <p id="text-parrafo1">

    Los Departamentos de Gestión Ambiental se establecieron mediante la Ley 1124 de 2007, reglamentada mediante el Decreto 1299 de 2008 del Ministerio de Ambiente, Vivienda y Desarrollo Territorial (hoy Ministerio de Ambiente y Desarrollo Sostenible). 
    Todas las empresas de carácter industrial en la jurisdicción la CVS que se encuentren operando, cuyas actividades de acuerdo a la normatividad ambiental vigente, requieran de licencia ambiental, plan de manejo ambiental, permisos, concesiones y demás autorizaciones ambientales, 
    deben conformar su Departamento de Gestión Ambiental – DGA.
   

    El DGA hace parte de la estructura organizacional de la empresa y dentro de sus funciones se encuentra realizar análisis de los aspectos ambientales (elementos, actividades, productos o servicios de una organización que pueden interactuar con el ambiente) para implementar estrategias 
    orientadas a prevenir, mitigar y controlar los impactos que se puedan generar o están generando en el medio ambiente por las actividades propias de la empresa.

Principales funciones del departamento de gestión ambiental:
</p>
<ul id="text-parrafo1">
<li>Establecer e implementar acciones encaminadas a dirigir la gestión ambiental de las empresas a nivel industrial,</li>
<li>Velar por el cumplimiento de la normatividad ambiental,</li>
<li>Prevenir, minimizar y controlar la generación de cargas contaminantes,</li>
<li>Promover prácticas de producción más limpia y el uso racional de los recursos naturales,</li>
<li>Aumentar la eficiencia energética y el uso de combustible más limpios,</li>
<li>Implementar opciones para la reducción de emisiones de gases de efectos invernadero,</li>
<li>Proteger y conservar los ecosistemas.</li>
<li>Los departamentos de gestión ambiental pueden estar conformados por personal propio de las empresas o por personal externo a estas y deben contar con personal capaz de brindar apoyo en las áreas técnica-ambiental, jurídica-ambiental y administrativa de la empresa.</li>  
</ul>

<h1 id="text-titulo1">Inscripción DGA</h1>

<p id="text-parrafo1">
    Una vez constituido el DGA, se debe informar a la CVS acerca de su creación; para facilitar a la corporación el registro correspondiente.
    Teniendo en cuenta lo anterior la Corporacion Autonoma Regional de los Valles de Sinu y San jorge, adoptó el formulario “registro de Departamento de Gestión Ambiental,  a través del cual los representantes legales de las empresas
    informan a la autoridad ambiental su conformación. 
</p> 


</div>



        </div>
        

    );

}

export default Inicio