const sequelize = require("../models/db");

const TipoIngreso = require("../models/TipoIngresoModels");
const SeguroMedico = require("../models/SeguroMedicoModels");
const MotivoAdmision = require("../models/MotivoAdmisionModels");
const Ala = require("../models/AlaModels");
const Habitacion = require("../models/HabitacionModels");
const Cama = require("../models/CamaModels");
const Paciente = require("../models/PacienteModels");

async function seed() {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    await TipoIngreso.bulkCreate([
      { id_tipo: 1, descripcion: "Derivación médica" },
      { id_tipo: 2, descripcion: "Emergencia" },
      { id_tipo: 3, descripcion: "Turno" },
    ]);

    await SeguroMedico.bulkCreate([
      { id_seguro: 1, nombre: "PAMI", tipo: "Público" },
      { id_seguro: 2, nombre: "OSDE", tipo: "Privado" },
      { id_seguro: 3, nombre: "Swiss Medical", tipo: "Privado" },
      { id_seguro: 4, nombre: "IOMA", tipo: "Público" },
      { id_seguro: 5, nombre: "Galeno", tipo: "Privado" },
    ]);

    await Paciente.bulkCreate([
      {
        id_seguro: null,
        nombre: "NN",
        apellido: "-",
        documento: "99999999",
        telefono: "99999999",
        fecha_nacimiento: "2025-06-12",
        domicilio: "-",
        genero: "Masculino",
        estatura: 0,
        peso: 0,
        estado: 1,
      },
      {
        id_seguro: 1,
        nombre: "Juan",
        apellido: "Pérez",
        documento: "12345678",
        telefono: "1133445566",
        fecha_nacimiento: "1985-04-12",
        domicilio: "Av. Rivadavia 1234",
        genero: "Masculino",
        estatura: 175,
        peso: 80,
        estado: true,
      },
      {
        id_seguro: 2,
        nombre: "María",
        apellido: "Gómez",
        documento: "23456789",
        telefono: "1122334455",
        fecha_nacimiento: "1990-07-21",
        domicilio: "Calle Belgrano 432",
        genero: "Femenino",
        estatura: 162,
        peso: 60,
        estado: true,
      },
      {
        id_seguro: 3,
        nombre: "Carlos",
        apellido: "Sanchez",
        documento: "34567890",
        telefono: "1144556677",
        fecha_nacimiento: "1978-11-02",
        domicilio: "Pasaje Mitre 145",
        genero: "Masculino",
        estatura: 180,
        peso: 85,
        estado: true,
      },
      {
        id_seguro: 1,
        nombre: "Laura",
        apellido: "Fernández",
        documento: "45678901",
        telefono: "1177889900",
        fecha_nacimiento: "1995-03-15",
        domicilio: "Av. San Martín 800",
        genero: "Femenino",
        estatura: 170,
        peso: 65,
        estado: true,
      },
      {
        id_seguro: 2,
        nombre: "Diego",
        apellido: "Coco",
        documento: "56789012",
        telefono: "1133221100",
        fecha_nacimiento: "1982-12-30",
        domicilio: "Calle Sarmiento 999",
        genero: "Masculino",
        estatura: 178,
        peso: 90,
        estado: true,
      },
      {
        id_seguro: null,
        nombre: "Tomas",
        apellido: "Suarez",
        documento: "44642586",
        telefono: "1235223100",
        fecha_nacimiento: "2002-12-30",
        domicilio: "Mi casa",
        genero: "Masculino",
        estatura: 178,
        peso: 70,
        estado: true,
      },
      {
        id_seguro: 3,
        nombre: "Ana",
        apellido: "Martínez",
        documento: "67890123",
        telefono: "1144667788",
        fecha_nacimiento: "1988-08-05",
        domicilio: "Calle Córdoba 555",
        genero: "Femenino",
        estatura: 165,
        peso: 58,
        estado: true,
      },
      {
        id_seguro: null,
        nombre: "Luis",
        apellido: "García",
        documento: "78901234",
        telefono: "1199887766",
        fecha_nacimiento: "1970-01-20",
        domicilio: "Av. Santa Fe 123",
        genero: "Masculino",
        estatura: 172,
        peso: 75,
        estado: true,
      },
      {
        id_seguro: 2,
        nombre: "Sofía",
        apellido: "Sosa",
        documento: "89012345",
        telefono: "1144778899",
        fecha_nacimiento: "2000-05-17",
        domicilio: "Calle San Juan 999",
        genero: "Femenino",
        estatura: 160,
        peso: 55,
        estado: true,
      },
      {
        id_seguro: 1,
        nombre: "Federico",
        apellido: "Rossi",
        documento: "90123456",
        telefono: "1177665544",
        fecha_nacimiento: "1992-09-10",
        domicilio: "Pasaje Luna 222",
        genero: "Masculino",
        estatura: 177,
        peso: 82,
        estado: true,
      },
      {
        id_seguro: 3,
        nombre: "Mónica",
        apellido: "Vega",
        documento: "01234567",
        telefono: "1133557799",
        fecha_nacimiento: "1984-04-28",
        domicilio: "Av. Mitre 456",
        genero: "Femenino",
        estatura: 168,
        peso: 63,
        estado: true,
      },
    ]);

    await MotivoAdmision.bulkCreate([
      { descripcion: "Neumonía grave" },
      { descripcion: "Insuficiencia cardíaca descompensada" },
      { descripcion: "Accidente cerebrovascular (ACV)" },
      { descripcion: "Infarto agudo de miocardio" },
      { descripcion: "Crisis hipertensiva" },
      { descripcion: "Deshidratación severa" },
      { descripcion: "Postoperatorio con complicaciones" },
      { descripcion: "Crisis convulsiva prolongada" },
      { descripcion: "Insuficiencia respiratoria aguda" },
      { descripcion: "Accidente de tránsito" },
      { descripcion: "Herida por arma blanca" },
      { descripcion: "Herida por arma de fuego" },
      { descripcion: "Politraumatismo" },
      { descripcion: "Fractura expuesta" },
      { descripcion: "Quemaduras graves" },
      { descripcion: "Caída de altura" },
      { descripcion: "Intoxicación por sustancias" },
      { descripcion: "Fracturas" },
    ]);

    await Ala.bulkCreate([
      { id_ala: 1, nombre: "Ala Norte" },
      { id_ala: 2, nombre: "Ala Sur" },
      { id_ala: 3, nombre: "Ala Este" },
      { id_ala: 4, nombre: "Ala Oeste" },
      { id_ala: 5, nombre: "Ala Pediatría" },
      { id_ala: 6, nombre: "Ala Urgencias" },
      { id_ala: 7, nombre: "Ala Maternidad" },
    ]);

    const habitaciones = [];
    for (let ala = 1; ala <= 7; ala++) {
      for (let i = 1; i <= 10; i++) {
        habitaciones.push({
          id_ala: ala,
          numero: ala * 100 + i,
          capacidad: 2,
        });
      }
    }
    await Habitacion.bulkCreate(habitaciones);

    const camas = [];
    let camaId = 1;
    for (let habitacionId = 1; habitacionId <= 70; habitacionId++) {
      camas.push(
        {
          id_cama: camaId++,
          id_habitacion: habitacionId,
          libre: true,
          higienizada: true,
          numero: 1,
        },
        {
          id_cama: camaId++,
          id_habitacion: habitacionId,
          libre: true,
          higienizada: true,
          numero: 2,
        }
      );
    }
    await Cama.bulkCreate(camas);

    console.log("Todos los datos iniciales insertados correctamente");
  } catch (error) {
    console.error("Error al insertar datos iniciales:", error);
  } finally {
    await sequelize.close();
    process.exit();
  }
}

seed();
