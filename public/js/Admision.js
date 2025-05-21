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
      const fechaNacimiento = btn.dataset.fechaNacimiento;
      const documento = btn.dataset.documento;

      // Cargar datos en el formulario
      document.getElementById("llenar-id").value = id;
      document.getElementById("llenar-nombre").value = nombre;
      document.getElementById("llenar-apellido").value = apellido;
      const fechaRaw = btn.dataset.fecha_nacimiento || "";
      let fechaFormateada = "";
      if (fechaRaw) {
        const partes = fechaRaw.split("-");
        if (partes.length === 3) {
          const yyyy = parseInt(partes[0], 10);
          const mm = parseInt(partes[1], 10) - 1;
          const dd = parseInt(partes[2], 10);
          const fecha = new Date(yyyy, mm, dd);
          const yyyyStr = fecha.getFullYear();
          const mmStr = String(fecha.getMonth() + 1).padStart(2, "0");
          const ddStr = String(fecha.getDate()).padStart(2, "0");
          fechaFormateada = `${yyyyStr}-${mmStr}-${ddStr}`;
        }
      }
      document.getElementById("llenar-fechaNacimiento").value = fechaFormateada;
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
