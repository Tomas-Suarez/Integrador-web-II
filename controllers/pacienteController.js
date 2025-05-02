const pacienteService = require("../service/PacienteService");

const getAllPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteService.obtenerTodosLosPacientes();
        res.render("allPacientes", { pacientes });
    } catch (error) {
        res
            .status(500)
            .send("Ocurrio un error en obtener los pacientes..", error.message);
    }
};

const createPaciente = async (req, res) => {
    try{
    let nombrePaciente = req.body.fnombre;
    let apellidoPaciente = req.body.fapellido;
    console.log("test: ", req.body)
    const datos = {
        Nombre: nombrePaciente.concat(" ", apellidoPaciente),
        Documento: req.body.fdocumento,
        Telefono: req.body.ftelefono,
        Domicilio: req.body.fdomicilio,
        Edad: parseInt(req.body.fedad),
        Genero: req.body.fgenero,
        Estatura: parseFloat(req.body.festatura),
        Peso: parseFloat(req.body.fpeso),
        Contacto_emergencia: req.body.fcontacto,
        Seguro_medico: req.body.fseguro === "true",
    };

    const { paciente, creado } = await pacienteService.crearPaciente(datos);

    if (creado) {
        res.redirect("/pacientes");
    }else{
        res.status(409).send("Error. El paciente ya fue registrado anteriormente!")
    }
    }catch(error){
        res.status(500).send("Ocurrio un error al crear el paciente: "+ error.message)
    }
};

const getPacienteById = (req, res) => {
    res.send(req.params.id);
};

module.exports = {
    getAllPacientes,
    createPaciente,
    getPacienteById,
};
