const express = require("express");
const router = express.Router();
const habitacionController = require("../controllers/HabitacionController");

router.get("/ListaHabitacion", habitacionController.getHabitacionesConCamas);

module.exports = router;