$(document).ready(function () {
    $("#TablaEnfermero").DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
      },
    });
  
    function limpiarFormulario() {
      $("#edit-id").val("");
      $("#edit-nombre").val("");
      $("#edit-apellido").val("");
      $("#edit-genero").val("Masculino");
      $("#edit-matricula").val("");
      $("#edit-turno").val("");
    }
  
    $("#btn-abrir-crearEnfermero").on("click", function () {
      limpiarFormulario();
      $("#form-enfermero").attr("action", "/enfermeros/registro/");
      $("#modal-editar").removeClass("hidden");
    });
  
    $(document).on("click", ".btn-editar", function () {
      const id = $(this).data("id");
      const nombre = $(this).data("nombre");
      const apellido = $(this).data("apellido");
      const generoRaw = $(this).data("genero");
      const matricula = $(this).data("matricula");
      const turno = $(this).data("turno");
  
      const genero =
        typeof generoRaw === "string"
          ? generoRaw.charAt(0).toUpperCase() + generoRaw.slice(1).toLowerCase()
          : "Otro";
  
      const generoValido = ["Masculino", "Femenino", "Otro"].includes(genero)
        ? genero
        : "Otro";
  
      $("#form-enfermero").attr("action", "/enfermeros/actualizar/");
      $("#edit-id").val(id);
      $("#edit-nombre").val(nombre);
      $("#edit-apellido").val(apellido);
      $("#edit-genero").val(generoValido);
      $("#edit-matricula").val(matricula);
      $("#edit-turno").val(turno);
  
      $("#modal-editar").removeClass("hidden");
    });
  
    $("#cerrar-modal").on("click", function () {
      $("#modal-editar").addClass("hidden");
    });
  });
  