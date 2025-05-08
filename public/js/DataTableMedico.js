// public/js/DataTableMedico.js
$(document).ready(function () {
    $("#TablaMedico").DataTable({
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
      $("#edit-especialidad").val("");
    }
  
    $("#btn-abrir-crearMedico").on("click", function () {
      limpiarFormulario();
      $("#form-medico").attr("action", "/medicos/registro/");
      $("#modal-editar").removeClass("hidden");
    });
  
    $(document).on("click", ".btn-editar", function () {
      const id = $(this).data("id");
      const nombre = $(this).data("nombre");
      const apellido = $(this).data("apellido");
      const generoRaw = $(this).data("genero");
      const matricula = $(this).data("matricula");
      const especialidad = $(this).data("especialidad");
  
      const genero =
        typeof generoRaw === "string"
          ? generoRaw.charAt(0).toUpperCase() + generoRaw.slice(1).toLowerCase()
          : "Otro";
  
      const generoValido = ["Masculino", "Femenino", "Otro"].includes(genero)
        ? genero
        : "Otro";
  
      $("#form-medico").attr("action", "/medicos/actualizar/");
      $("#edit-id").val(id);
      $("#edit-nombre").val(nombre);
      $("#edit-apellido").val(apellido);
      $("#edit-genero").val(generoValido);
      $("#edit-matricula").val(matricula);
      $("#edit-especialidad").val(especialidad);
  
      $("#modal-editar").removeClass("hidden");
    });
  
    $("#cerrar-modal").on("click", function () {
      $("#modal-editar").addClass("hidden");
    });
  });
  