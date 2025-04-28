const getAllPacientes = (req, res)=>{
    res.send("hola");
};

const getPacienteById = (req, res)=>{
    res.send(req.params.id);
};

module.exports = {
    getAllPacientes,
    getPacienteById
};