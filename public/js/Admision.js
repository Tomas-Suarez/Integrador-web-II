document.addEventListener("DOMContentLoaded", () => {
  const formAdmision = document.getElementById("form-admision");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");

  const alaSelect = document.getElementById("registro-ala");
  const habitacionSelect = document.getElementById("registro-habitacion");
  const generoInput = document.getElementById("genero-paciente");

  const limpiarFormulario = () => {
    formAdmision.reset();
    document.getElementById("llenar-id").value = "";
    habitacionSelect.innerHTML = '<option disabled selected value="">-- Seleccione la habitación --</option>';
  };

  document.querySelectorAll(".btn-abrir-Registro").forEach(btn => {
    btn.addEventListener("click", () => {
      limpiarFormulario();

      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const apellido = btn.dataset.apellido;
      const documento = btn.dataset.documento;
      const genero = btn.dataset.genero;

      // Cargar datos en el formulario
      document.getElementById("llenar-id").value = id;
      document.getElementById("llenar-nombre").value = nombre;
      document.getElementById("llenar-apellido").value = apellido;
      document.getElementById("llenar-documento").value = documento;
      generoInput.value = genero;

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

  // 🔄 Escucha el cambio en el <select> de ala para cargar habitaciones válidas
  alaSelect.addEventListener("change", async () => {
    const alaId = alaSelect.value;
    const pacienteId = document.getElementById("llenar-id").value;

    // Limpiar select de habitación
    habitacionSelect.innerHTML = '<option disabled selected value="">-- Seleccione la habitación --</option>';

    // Validar que ambos datos estén disponibles
    if (!alaId || !pacienteId) {
      console.warn("Faltan datos para buscar habitaciones (alaId o pacienteId)");
      return;
    }

    try {
      const response = await fetch(`/habitaciones/por-ala?alaId=${alaId}&pacienteId=${pacienteId}`);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error desconocido del servidor");
      }

      const habitaciones = await response.json();

      if (!Array.isArray(habitaciones)) {
        console.error("La respuesta del servidor no es una lista:", habitaciones);
        return;
      }

      habitaciones.forEach(h => {
        const option = document.createElement("option");
        option.value = h.id_habitacion;
        option.textContent = `Habitación ${h.numero} (${h.capacidad} camas)`;
        habitacionSelect.appendChild(option);
      });

    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  });
});
