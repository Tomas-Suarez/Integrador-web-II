# Sistema Hospitalario para Internaciones - Proyecto Web II
## Índice 📒
- [Descripción general](#descripción-general)
- [Estado del proyecto](#estado-del-proyecto)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Funcionalidades requeridas](#funcionalidades-requeridas)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Autores](#autores)

## Descripción general 🚀

Este proyecto fue desarrollado durante la cursada de la materia **Programación Web 2**, con el objetivo de construir una aplicación web orientada a la gestión de **internaciones hospitalarias**.

## Estado del proyecto 🔍

![Badge en Desarrollo](https://img.shields.io/badge/STATUS-EN%20DESARROLLO-green)


### Cómo ejecutar el proyecto 🔧

1. Clona este repositorio
```
git clone https://github.com/Tomas-Suarez/Integrador-web-II.git
```
1. Ingresa al directorio del proyecto: 
```
cd Integrador-web-II
```
1. Instala las dependencias:
```
npm install
```
1. Configura la base de datos MySQL y actualiza los datos de conexión en `config/dbConfig.js` si es necesario.

1. Sincroniza la base de datos y carga datos de ejemplo (opcional):
```
node seeders/seed.js
```
1. Inicia la aplicación:
```
npm start
```

1. Accedé a la app en tu navegador en http://localhost:3000


## Funcionalidades requeridas ⚙️

- Creación, edición y borrado de pacientes.
- Búsqueda y listado de pacientes.
- Registro de admisión y eliminación de admisión.
- Listado de internaciones y asignación de dormitorios según el género del paciente, considerando también si la cama está higienizada.
- Listado de habitaciones con sus respectivas camas ocupadas y libres.
- Funcionamiento de un paciente NN internado por urgencia.

### Tecnologías utilizadas 🎨
- **Node.js + Express:** desarrollo del backend y gestión de rutas.
- **Sequelize:** ORM para definir modelos, relaciones y ejecutar consultas a la base de datos.
- **SQL:** comprensión del modelo relacional. Mediante **MySQL**
- **PUG:** motor de plantillas para renderizar vistas (formularios y listados).
- **CSS:** estilización de vistas.
- **Dotenv:** carga de variables de entorno desde archivos `.env`
- **Method-Override:** permite el uso de métodos HTTP como PUT y PATCH desde los formularios.
- **Express-Validator:** permite la validación desde el lado del backend.
- **Nodemon:** herramienta para reiniciar el servidor durante el desarrollo.
- **DataTable:** mostrar informacion paciente, admision, habitacion, etc

### EndPoints 📚

##### 🧍‍♂️Pacientes:

#####🔹GET	/GestionPaciente
** Descripcion: ** Muestra todos los pacientes registrados
** Renderiza: ** `Pacientes/GestionPaciente.pug`

#####🔹POST	/registro
** Descripcion: ** Registrar un nuevo paciente desde un formulario
** Body: ** Datos del paciente

#####🔹PUT	/actualizar/:id
** Descripcion: ** Actualiza la información de un paciente especificado
** Parametros: ** ID del paciente
** Body: ** Datos actualizados del paciente

#####🔹GET	/RegistrarAdmision
** Descripcion: ** Carga el formulario para el registro de admision
** Renderiza: ** `Admision/RegistrarAdmision.pug`

#####🔹GET	/obtener-paciente
** Descripcion: ** Me carga el paciente por el ID, en el formulario de registrar admision
** Renderiza: ** `Admision/RegistrarAdmision.pug`

#####🔹GET	/internacion-emergencia
** Descripcion: ** Cargar el formulario para la emergencia, donde va el paciente NN
** Renderiza: ** `Emergencia/RegistrarEmergencia.pug`

#####🔹PATCH	/cambiar-estado/:id
** Descripcion: ** Realiza un borrado logico de un paciente en particular, a través del DNI
**Parámetros:** ID del paciente  

##### 💉Admision:

#####🔹GET	/InternacionPaciente
** Descripcion: ** Muestra todos las admisiones pendientes
** Renderiza: ** `Internacion/InternacionPaciente.pug`

##### 🔹POST /registrar
**Descripción:** Registra una nueva admisión para un paciente existente  
**Body:** Datos del paciente (ID) y detalles de la admisión (vía de ingreso, motivo, fecha, etc.)

##### 🔹POST /registrarEmergencia
**Descripción:** Registra una admisión de emergencia para el paciente NN y le asigna una habitación 
**Body:** Datos de un paciente(NN), detalles de la admision y asignacion de habitacion

##### 🔹PATCH /cancelarAdmision/:id
** Descripcion: ** Realiza un borrado logico de una admision
**Parámetros:** ID de la admision 

##### 🛏️Habitacion:

#####🔹GET	/ListaHabitacion
** Descripcion: ** Muestra todas las habitaciones con sus respectivas camas y alas.
** Renderiza: ** `Habitacion/ListaHabitacion.pug`

#####🔹GET	/por-ala
** Descripcion: ** Obtiene las habitaciones disponibles filtradas por el ala y el genero del paciente
** Query params: **
- `alaId`: ID del ala seleccionada  
- `pacienteId`: ID del paciente (se usa para obtener el genero)

** Nos devolvera un json**

##### 🛏️AsignacionDormitorio:

#####🔹GET	/GestionInternacion
** Descripcion: ** Muestra las internaciones activas con sus respectivos pacientes y habitacion
** Renderiza: ** `GestionarInternacion/GestionarInternacion.pug`

#####🔹POST	/asignar
** Descripcion: ** Le asignamos una habitacion a un paciente (Internacion)
**Body:** ID de la admision y ID de la habitacion

## Autores ✒️

* **Tomas Agustin Suarez** - *Desarrollador* - [Tomas-Suarez](https://github.com/Tomas-Suarez) 

