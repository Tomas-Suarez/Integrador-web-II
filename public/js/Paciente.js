document.addEventListener("DOMContentLoaded", () => {

  const formPaciente = document.getElementById("form-paciente");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");
  const crearBtn = document.getElementById("btn-abrir-crearPaciente");

  const limpiarFormulario = () => {
    formPaciente.reset();
    document.getElementById("edit-id").value = "";
  };

  if (crearBtn) {
    crearBtn.addEventListener("click", () => {
      limpiarFormulario();
      formPaciente.action = "/pacientes/registro/";
      modal.classList.remove("hidden");
    });
  }

  document.querySelectorAll(".btn-editar").forEach((btn) => {
      console.log("Paciente:", btn.dataset, "Seguro:", btn.dataset.id_seguro);
    btn.addEventListener("click", () => {
      formPaciente.action = "/pacientes/actualizar/";

      document.getElementById("edit-id").value = btn.dataset.id;
      document.getElementById("edit-nombre").value = btn.dataset.nombre || "";
      document.getElementById("edit-apellido").value = btn.dataset.apellido || "";
      document.getElementById("edit-documento").value = btn.dataset.documento || "";
      document.getElementById("edit-telefono").value = btn.dataset.telefono || "";
      document.getElementById("edit-domicilio").value = btn.dataset.domicilio || "";

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
      document.getElementById("edit-fecha_nacimiento").value = fechaFormateada;

      document.getElementById("edit-estatura").value = btn.dataset.estatura || "";
      document.getElementById("edit-peso").value = btn.dataset.peso || "";

      const contactoEmergenciaInput = document.getElementById("edit-contacto_emergencia");
      if (contactoEmergenciaInput) {
        contactoEmergenciaInput.value = btn.dataset.contacto_emergencia || "";
      }

      const genero = btn.dataset.genero || "Otro";
      document.getElementById("edit-genero").value = ["Masculino", "Femenino", "Otro"].includes(genero)
        ? genero
        : "Otro";

      document.getElementById("edit-seguro").value = btn.dataset.id_seguro || "null";

      modal.classList.remove("hidden");
    });
  });

  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
