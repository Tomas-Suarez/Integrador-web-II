$(document).ready(function () {
  $("#TablaPaciente").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
    },
  });

  function limpiarFormulario() {
    $("#edit-id").val("");
    $("#edit-nombre").val("");
    $("#edit-apellido").val("");
    $("#edit-documento").val("");
    $("#edit-edad").val("");
    $("#edit-genero").val("Masculino");
    $("#edit-telefono").val("");
    $("#edit-domicilio").val("");
    $("#edit-estatura").val("");
    $("#edit-peso").val("");
    $("#edit-contacto_emergencia").val("");
    $("#edit-seguro").val("true");
  }

  // Creamos el paciente
  $("#btn-abrir-crearPaciente").on("click", function () {
    limpiarFormulario();
    $("#form-paciente").attr("action", "/pacientes/registro/");
    $("#modal-editar").removeClass("hidden");
  });

  // Editamos el paciente
  $(document).on("click", ".btn-editar", function () {
    const id = $(this).data("id");
    const nombre = $(this).data("nombre");
    const apellido = $(this).data("apellido");
    const documento = $(this).data("documento") || "";
    const edad = $(this).data("edad");
    const generoRaw = $(this).data("genero");
    const telefono = $(this).data("telefono") || "";
    const domicilio = $(this).data("domicilio") || "";
    const estatura = $(this).data("estatura") || "";
    const peso = $(this).data("peso") || "";
    const contactoEmergencia = $(this).data("contacto_emergencia") || "";
    const seguroMedico = String($(this).data("seguro_medico"));

    const genero =
      typeof generoRaw === "string"
        ? generoRaw.charAt(0).toUpperCase() + generoRaw.slice(1).toLowerCase()
        : "Otro";

    const generoValido = ["Masculino", "Femenino", "Otro"].includes(genero)
      ? genero
      : "Otro";

    $("#form-paciente").attr("action", "/pacientes/actualizar/");
    $("#edit-id").val(id);
    $("#edit-nombre").val(nombre);
    $("#edit-apellido").val(apellido);
    $("#edit-documento").val(documento);
    $("#edit-edad").val(edad);
    $("#edit-genero").val(generoValido);
    $("#edit-telefono").val(telefono);
    $("#edit-domicilio").val(domicilio);
    $("#edit-estatura").val(estatura);
    $("#edit-peso").val(peso);
    $("#edit-contacto_emergencia").val(contactoEmergencia);
    $("#edit-seguro").val(seguroMedico);

    $("#modal-editar").removeClass("hidden");
  });

  $("#cerrar-modal").on("click", function () {
    $("#modal-editar").addClass("hidden");
  });
});
