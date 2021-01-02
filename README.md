# GIT HISTORY Client

Codigo fuente del front-end de la web-app para el proyecto "99minutos-fullstack-interview-test"

## Requerimientos
* Node >= 12.16.2 (https://nodejs.org/es/)
* Yarn >= 1.22.4 (https://yarnpkg.com/)
* Git >= 2.24.0 (https://git-scm.com/) 
## Instrucciones de ejecucion

* Clonar este repositorio y acceder a el
````
git clone https://github.com/Alex9808/git-client
cd git-clone
````
* Instalar las librerias y dependencias
````
yarn install
````
* Finalizada la instalacion ejecutar el servidor de desarrollo con:
````
yarn startClient
````

* En el navegador ingresar a ``http://localhost:3000``

### Notas

* Se puede cambiar la configuracion del servidor donde se hospeda el servicio API en ``src/config/index.js`` modificando el campo ``apiPath`` por defecto esta en ``http://localhost:3000`` debido a un proxy establecido en ``package.json``
* Para el buen funcionamento de este sistema en etapa de desarrollo es necesario usar un proxy que se configura en ``package.json`` que refiere al servicio API de la web-app.
* Las operaciones de "Merge" se hacen localmente y no afectan en ninguna manera al repositorio original. 
* Al momento de salir de la pantalla principal se eliminan todas las Pull Requests que se almacenaron en la base de datos del servidor.
* Para cambiar de estado "Open" a "Closed" se le tiene que dar un click al boton de la parte superior derecha de cada tarjeta donde se muestra la informacion de un PR.