document.addEventListener("DOMContentLoaded", () => {
  const formInternacion = document.getElementById("form-internacion");
  const modal = document.getElementById("modal-internar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");

  const alaSelect = document.getElementById("registro-ala");
  const habitacionSelect = document.getElementById("registro-habitacion");

  const limpiarFormulario = () => {
    formInternacion.reset();
    document.getElementById("id-admision").value = "";
    habitacionSelect.innerHTML =
      '<option disabled selected value="">-- Seleccione la habitación --</option>';
  };

  document.querySelectorAll(".btn-abrir-internacion").forEach((btn) => {
    btn.addEventListener("click", () => {
      const admisionId = btn.dataset.id;
      const pacienteId = btn.dataset.idpaciente;

      document.getElementById("id-admision").value = admisionId;
      document.getElementById("id-paciente").value = pacienteId;

      document.getElementById("registro-ala").value = "";
      document.getElementById("registro-habitacion").innerHTML = `
      <option disabled selected value="">-- Seleccione la habitación --</option>
    `;

      document.getElementById("modal-internar").classList.remove("hidden");
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

  alaSelect.addEventListener("change", async () => {
    const alaId = alaSelect.value;

    habitacionSelect.innerHTML =
      '<option disabled selected value="">-- Seleccione la habitación --</option>';

    try {
      const pacienteId = document.getElementById("id-paciente").value;

      const response = await fetch(
        `/habitaciones/por-ala?alaId=${alaId}&pacienteId=${pacienteId}`
      );

      const habitaciones = await response.json();

      if (!Array.isArray(habitaciones)) {
        console.error("Respuesta inválida:", habitaciones);
        return;
      }

      habitaciones.forEach((h) => {
        const option = document.createElement("option");
        option.value = h.id_habitacion;
        option.textContent = `Habitación ${h.numero}`;
        habitacionSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  });
});
