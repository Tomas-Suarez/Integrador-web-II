const express = require('express');
const path = require('path');
require('./models/Asociaciones'); //Importa y ejecuta todas las asociaciones de los models - SEQUELIZE
const logging = require('./middlewares/logging');
const error404 = require('./middlewares/404notFound');
const app = express();

// Importar las rutas
const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/MedicoRoutes');
const enfermeroRoutes = require('./routes/EnfermeroRoutes');
const admisionRoutes = require('./routes/AdmisionRoutes');
const habitacionRoutes = require('./routes/HabitacionRoutes');

// Configuracion del motor de plantillas - PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Define la carpeta "public" para usar los archivos estaticos (css, js, img)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para logging personalizado de las peticiones
app.use(logging);

// Middleware para obtener datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use('/pacientes', pacienteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/enfermeros', enfermeroRoutes);
app.use('/admisiones', admisionRoutes);
app.use('/habitaciones', habitacionRoutes);

// Ruta principal donde se encuentra la vista principal
app.get('/', (req, res) =>{
    res.render('Principal');
})

//Middleware para renderizar cuando ocurre un error 404 (Osea cuando no se encuentra la ruta)
app.use(error404);

// Inicio del servidor
app.listen(3000, ()=>{ //Puerto 3000
    console.log("Iniciando el servidor...");
});