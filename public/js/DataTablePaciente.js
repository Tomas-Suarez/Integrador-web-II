document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("TablaPaciente");
  if (tabla && window.jQuery) {
    $(tabla).DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
      },
    });
  }
});
