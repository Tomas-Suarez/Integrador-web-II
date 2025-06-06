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

## EndPoints 📚

### 🧍‍♂️ Pacientes

- **GET** `/GestionPaciente`  
  Muestra todos los pacientes registrados  
  🖼️ Renderiza: `Pacientes/GestionPaciente.pug`

- **POST** `/registro`  
  Registra un nuevo paciente desde un formulario

- **PUT** `/actualizar/:id`  
  Actualiza la información de un paciente especificado  
  🧾 Parámetros: ID del paciente

- **GET** `/RegistrarAdmision`  
  Carga el formulario para el registro de admisión  
  🖼️ Renderiza: `Admision/RegistrarAdmision.pug`

- **GET** `/obtener-paciente`  
  Carga los datos del paciente por ID para el formulario de admisión  
  🖼️ Renderiza: `Admision/RegistrarAdmision.pug`

- **GET** `/internacion-emergencia`  
  Carga el formulario para emergencia (paciente NN)  
  🖼️ Renderiza: `Emergencia/RegistrarEmergencia.pug`

- **PATCH** `/cambiar-estado/:id`  
  Realiza un borrado lógico de un paciente  
  🧾 Parámetros: ID del paciente

---

### 💉 Admisión

- **GET** `/InternacionPaciente`  
  Lista todas las admisiones pendientes  
  🖼️ Renderiza: `Internacion/InternacionPaciente.pug`

- **POST** `/registrar`  
  Registra una nueva admisión  
  📦 Body: ID del paciente + detalles de la admisión

- **POST** `/registrarEmergencia`  
  Registra una admisión para paciente NN  
  📦 Body: Datos del paciente NN + detalles + habitación

- **PATCH** `/cancelarAdmision/:id`  
  Borrado lógico de una admisión  
  🧾 Parámetros: ID de la admisión

---

### 🛏️ Habitaciones

- **GET** `/ListaHabitacion`  
  Lista todas las habitaciones con camas y alas  
  🖼️ Renderiza: `Habitacion/ListaHabitacion.pug`

- **GET** `/por-ala`  
  Devuelve habitaciones disponibles según ala y género  
  📤 Devuelve: JSON  
  🔸 Query Params:  
    - `alaId`: ID del ala seleccionada  
    - `pacienteId`: ID del paciente

---

### 🛌 Asignación de Dormitorio

- **GET** `/GestionInternacion`  
  Muestra internaciones activas con sus respectivas habitaciones  
  🖼️ Renderiza: `GestionarInternacion/GestionarInternacion.pug`

- **POST** `/asignar`  
  Asigna una habitación a una admisión  
  📦 Body: ID de la admisión y ID de la habitación

## Autores ✒️

* **Tomas Agustin Suarez** - *Desarrollador* - [Tomas-Suarez](https://github.com/Tomas-Suarez) 

