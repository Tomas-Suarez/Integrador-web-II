const express = require("express");
const router = express.Router();
const medicoController = require("../controllers/MedicoController");
const { validarMedico } = require("../middlewares/medicoValidator");
const { validationResult } = require("express-validator");

router.get("/GestionMedico", medicoController.getAllMedico);

router.post(
    "/registro",
    validarMedico,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty()) {
        return res.status(400).render("Medicos/RegistrarMedico", {
          errors: errors.array(),
          oldData: req.body,
        });
      }
      next();
    },
    medicoController.createMedico
  );
  
  router.post("/actualizar", medicoController.updateMedico);

  router.post("/cambiar-estado", medicoController.changeStatusMedico);

module.exports = router;