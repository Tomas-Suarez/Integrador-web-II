const express = require("express");
const router = express.Router();
const habitacionController = require("../controllers/HabitacionController");

router.get("/ListaHabitacion", habitacionController.getHabitaciones);

router.get("/por-ala", habitacionController.getHabitacionesPorAlaYGenero);


module.exports = router;
