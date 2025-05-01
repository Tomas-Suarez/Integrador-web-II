const Paciente = require('../models/PacienteModels');

const obtenerTodosLosPacientes = async () => {
    try{
        const pacientes = await Paciente.findAll();
        return pacientes;
    }catch(error){
        throw new Error('Ocurrio un error al obtener los pacientes: '+ error.message)
    }
};

const crearPaciente = async (datos) =>{
    try{
    const [paciente, creado] = await Paciente.findOrCreate(
        {
        where: {Documento: 'datos.Documento'},
        defaults: {
            Nombre: 'datos.Nombre',
            Telefono: 'datos.Telefono',
            Domicilio: 'datos.Domicilio',
            Edad: 'datos.Edad',
            Genero: 'datos.Genero',
            Estatura: 'datos.Estatura',
            Peso: 'datos.Peso',
            Contacto_emergencia: 'datos.Contacto_emergencia',
            Seguro_medico: 'datos.Seguro_medico'
        }
        });
        return {paciente, creado};
    }catch(error){
        throw new Error('Ocurrio un error al crear el paciente'+ error.message);
    }
};