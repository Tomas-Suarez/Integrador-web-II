$(document).ready(function () {
  $("#TablaPaciente").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
    }
  });

  $(document).on("click", ".btn-editar", function () {
    const id = $(this).data("id");
    const nombre = $(this).data("nombre");
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

    $("#edit-id").val(id);
    $("#edit-nombre").val(nombre);
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
