document.addEventListener("DOMContentLoaded", () => {
  const formMedico = document.getElementById("form-medico");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");
  const crearBtn = document.getElementById("btn-abrir-crearMedico");

  const limpiarFormulario = () => {
    formMedico.reset();
    document.getElementById("edit-id").value = "";
  };

  if (crearBtn) {
    crearBtn.addEventListener("click", () => {
      limpiarFormulario();
      formMedico.action = "/medicos/registro/";
      modal.classList.remove("hidden");
    });
  }

  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      formMedico.action = "/medicos/actualizar/";

      document.getElementById("edit-id").value = btn.dataset.id || "";
      document.getElementById("edit-nombre").value = btn.dataset.nombre || "";
      document.getElementById("edit-apellido").value = btn.dataset.apellido || "";
      document.getElementById("edit-matricula").value = btn.dataset.matricula || "";
      document.getElementById("edit-documento").value = btn.dataset.documento || "";

      const genero = btn.dataset.genero || "Otro";
      document.getElementById("edit-genero").value =
        ["Masculino", "Femenino", "Otro"].includes(genero) ? genero : "Otro";

      document.getElementById("edit-especialidad").value = btn.dataset.especialidad || "";
      document.getElementById("edit-guardia").value = btn.dataset.guardia || "";

      modal.classList.remove("hidden");
    });
  });

  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
