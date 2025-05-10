const express = require('express');
const path = require('path');
require('./models/Asociaciones');
const logging = require('./middlewares/logging');
const error404 = require('./middlewares/404notFound');
const app = express();

const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/MedicoRoutes');
const enfermeroRoutes = require('./routes/EnfermeroRoutes');
//Falta admision
const habitacionRoutes = require('./routes/HabitacionRoutes');


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logging);

app.use(express.urlencoded({ extende: true }));
app.use(express.json());

app.use('/pacientes', pacienteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/enfermeros', enfermeroRoutes);
//Admision
app.use('/habitaciones', habitacionRoutes);


app.get('/', (req, res) =>{
    res.render('Principal');
})

app.use(error404);


app.listen(3000, ()=>{
    console.log("Iniciando el servidor...");
});
