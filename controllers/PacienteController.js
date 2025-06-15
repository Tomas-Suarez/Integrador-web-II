// Importamos los servicios en donde se maneja la logica
const pacienteService = require("../service/PacienteService");
const SeguroService = require("../service/SeguroMedicoService");
const IngresoService = require("../service/TipoIngresoService");
const MotivoService = require("../service/MotivoAdmisionService");
const AlaService = require("../service/AlaService");
const HabitacionService = require("../service/HabitacionService");


// Controlador para obtener los pacientes con sus respectivos seguros medicos.
const getAllPacientes = async (req, res) => {
  try {
    // Obtenemos los datos de todos los pacientes
    const pacientes = await pacienteService.getAllPacientes();
    // Obtenemos todos los seguros medicos disponibles
    const seguros = await SeguroService.getAllSegurosMedicos();
    // Renderizamos en la vista, con los datos obtenidos
    res.render("Paciente/GestionPaciente", { pacientes, seguros });
  } catch (error) {
    console.error(error);
    res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al mostrar pacientes",
    });
  }
};


// Controlador para obtener todos los pacientes activos, incluyendo los ingresos, motivos, alas 
const formAdmision = async (req, res) => {
  try {
    // Obtenemos los datos para el formulario de admision
    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();
    // Renderizamos en la vista, con los datos obtenidos
    res.render("Admision/RegistrarAdmision", {
      ingresos,
      motivos,
      alas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("Admision/RegistrarAdmision", {
      error: "Error al formulario de registro",
    });
  }
};

// Controlador para crear un nuevo paciente a partir de los datos recibidos por el formulario (req.body)
const createPaciente = async (req, res) => {
  try {
    // Si el id_seguro se encuentra como null, entonces no posee seguro medico
    const idSeguro =
      req.body.id_seguro === "null" || req.body.id_seguro === ""
        ? null
        : parseInt(req.body.id_seguro);

    // Construimos un objeto con los datos del paciente obtenidos a traves del formulario
    const datos = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      documento: req.body.documento,
      telefono: req.body.telefono,
      domicilio: req.body.domicilio,
      fecha_nacimiento: req.body.fecha_nacimiento,
      genero: req.body.genero,
      estatura: req.body.estatura ? parseFloat(req.body.estatura) : null,
      peso: req.body.peso ? parseFloat(req.body.peso) : null,
      id_seguro: idSeguro,
    };

    // Invocamos al servicio para crear el paciente, el cual nos va a devolver el paciente y si fue creado.
    const { paciente, creado } = await pacienteService.createPaciente(datos);

    if (creado) {
      // Si se creó correctamente, redirigimos a la gestión de pacientes
      return res.redirect("/pacientes/GestionPaciente");
    } else {
      // Si no se creó porque ya existe un paciente con ese documento,
      // renderizamos la vista con el flag para mostrar la notificación flotante
      const pacientes = await pacienteService.getAllPacientes();
      const seguros = await SeguroService.getAllSegurosMedicos();
      return res.status(409).render("Paciente/GestionPaciente", {
        pacientes,
        seguros,
        errorDniExistente: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al crear el paciente",
    });
  }
};



// Controlador para actualizar un paciente existente con los datos del formulario
const updatePaciente = async (req, res) => {
  try {
    // Obtenemos el id del paciente a traves de los parametros de ruta
    const id_paciente = parseInt(req.params.id);

    // Si el id_seguro se encuentra como null, entonces no posee seguro medico
    const idSeguro =
      req.body.id_seguro === "null" || req.body.id_seguro === ""
        ? null
        : parseInt(req.body.id_seguro);

    // Creamos un objeto pero con los datos actualizados del paciente
    const datos = {
      id_paciente,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      documento: req.body.documento,
      telefono: req.body.telefono,
      domicilio: req.body.domicilio,
      fecha_nacimiento: req.body.fecha_nacimiento,
      genero: req.body.genero,
      estatura: req.body.estatura ? parseFloat(req.body.estatura) : null,
      peso: req.body.peso ? parseFloat(req.body.peso) : null,
      id_seguro: idSeguro,
    };

    const { actualizado } =  await pacienteService.updatePaciente(datos);

    if(!actualizado){
      return res.redirect("/pacientes/GestionPaciente");
    }

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    const pacientes = await pacienteService.getAllPacientes();
    const seguros = await SeguroService.getAllSegurosMedicos();

    res.status(500).render("Paciente/GestionPaciente", {
      pacientes,
      seguros,
      error: "Error al actualizar el paciente",
    });
  }
};

// Controlador para cambiar el estado del paciente
const changeStatusPaciente = async (req, res) => {
  try {

    const id_paciente = parseInt(req.params.id);
    const estado = req.body.estado === 'true';

    const datos = {
      id_paciente,
      estado,
    };

    await pacienteService.changeStatusPaciente(datos);

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    console.error(error);
    res.status(500).render("Paciente/GestionPaciente", {
      error: "Error al cambiar el estado del paciente: " + error.message,
    });
  }
};

// Controlador para el form de admision, donde cargamos el paciente por el dni
const cargarPaciente = async (req, res) => {
  try {
    // Obtenemos el documento de la query string
    const documento = req.query.documento;
    // Buscamos el paciente por su documento
    const paciente = await pacienteService.getPacienteByDNI(documento);

    //Obtenemos los datos necesarios para cargar
    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();

    if (!paciente) {
      // Si no encontramos el paciente, mostramos un error en el formulario
      return res.status(404).render("Admision/RegistrarAdmision", {
        error: "Paciente no encontrado!",
        documento,
        ingresos,
        motivos,
        alas,
      });
    }

    // Caso contrario, si se lo encuentra, rederizamos la vista con los datos del paciente
    res.render("Admision/RegistrarAdmision", {
      paciente,
      documento,
      ingresos,
      motivos,
      alas,
    });
  } catch (error) {
    console.error(error);
    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();

    res.status(500).render("Admision/RegistrarAdmision", {
      error: "Ocurrió un error al buscar el paciente",
      ingresos,
      motivos,
      alas,
    });
  }
};

// Controlador para el form de emergencia, cuando tenemos un paciente NN
const formEmergencia = async (req, res) => {
  try {
    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();
    const habitaciones = await HabitacionService.getHabitacionesEmergencia(6);

    res.render("Emergencia/RegistrarEmergencia", {
      ingresos,
      motivos,
      alas,
      habitaciones,
    });
  } catch (error) {
    res.status(500).send("Error al cargar la vista de emergencia");
  }
};

// Exportamos controladores para usarlos en las rutas
module.exports = {
  getAllPacientes,
  formAdmision,
  createPaciente,
  updatePaciente,
  changeStatusPaciente,
  cargarPaciente,
  formEmergencia,
};
