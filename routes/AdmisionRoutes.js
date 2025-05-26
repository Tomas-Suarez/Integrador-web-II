const express = require("express");
const router = express.Router();
const AdmisionController = require("../controllers/AdmisionController");
const { validarAdmision } = require("../middlewares/admisionValidator");
const { validationResult } = require("express-validator");

router.get("/GestionInternacion", AdmisionController.getAllAdmisiones);

router.post(
  "/registrar",
  validarAdmision,
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("Admisiones/RegistrarAdmision", {
        errors: errors.array(),
        oldData: req.body,
      });
    }
    next();
  },
  AdmisionController.createAdmision
);

module.exports = router;
