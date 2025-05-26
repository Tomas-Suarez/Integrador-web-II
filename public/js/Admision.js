document.addEventListener("DOMContentLoaded", () => {
  const formAdmision = document.getElementById("form-admision");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");

  const limpiarFormulario = () => {
    formAdmision.reset();
    document.getElementById("llenar-id").value = "";
  };

  document.querySelectorAll(".btn-abrir-Registro").forEach(btn => {
    btn.addEventListener("click", () => {
      limpiarFormulario();

      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const apellido = btn.dataset.apellido;
      const documento = btn.dataset.documento;

      // Cargar datos en el formulario
      document.getElementById("llenar-id").value = id;
      document.getElementById("llenar-nombre").value = nombre;
      document.getElementById("llenar-apellido").value = apellido;
      document.getElementById("llenar-documento").value = documento;

      // Mostrar modal
      modal.classList.remove("hidden");
    });
  });

  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
