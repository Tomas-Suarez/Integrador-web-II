const express = require('express');
const path = require('path');
require('./models/Asociaciones');
const logging = require('./middlewares/logging');
const error404 = require('./middlewares/404notFound');
const app = express();
const pacienteRoutes = require('./routes/pacienteRoutes');


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logging);
app.use('/pacientes', pacienteRoutes);

app.get('/', (req, res) => {
    res.render('Pacientes/RegistrarPaciente');
  });

app.use(error404);


app.listen(3000, ()=>{
    console.log("Iniciando el servidor...");
});
