const express = require('express');
const path = require('path');
const logging = require('./middlewares/logging');
const error404 = require('./middlewares/404notFound');
const pacienteRoutes = require('./routes/pacienteRoutes');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(logging);
app.use('/pacientes', pacienteRoutes);

app.use(error404);


app.listen(3000, ()=>{
    console.log("Iniciando el servidor...");
});