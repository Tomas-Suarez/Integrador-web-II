document.addEventListener("DOMContentLoaded", () => {
  // Pasamos a variables los elementos por su ID
  const modal = document.getElementById("modal-internar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");

  const alaSelect = document.getElementById("registro-ala");
  const habitacionSelect = document.getElementById("registro-habitacion");

  // Funcionamiento del boton abrir internacion
  document.querySelectorAll(".btn-abrir-internacion").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Obtenemos los id de paciente y admision
      const admisionId = btn.dataset.id;
      const pacienteId = btn.dataset.idpaciente;

      // Les asignamos los valores
      document.getElementById("id-admision").value = admisionId;
      document.getElementById("id-paciente").value = pacienteId;

      // Reseteamos los valores de ala y habitacion
      document.getElementById("registro-ala").value = "";
      document.getElementById("registro-habitacion").innerHTML = `
      <option disabled selected value="">-- Seleccione la habitación --</option>
    `;

    //Mostramos el modal
      document.getElementById("modal-internar").classList.remove("hidden");
    });
  });

  // Funcionamiento del boton cerrar
  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Funcionamiemnto de cuando se le hace click afuera del modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });


  // Funcionamiento entre seleccionar un ala y mostrar las habitaciones
  alaSelect.addEventListener("change", async () => {
    const alaId = alaSelect.value; // Pasamos a variable el id del ala cuando se selecciona

    // Reinicia las habitaciones
    habitacionSelect.innerHTML =
      '<option disabled selected value="">-- Seleccione la habitación --</option>';


    try {
      const pacienteId = document.getElementById("id-paciente").value; // Pasamos a variable el id del paciente

      // Llamamos a la API que a que creamos para filtrar las habitaciones por ala y genero
      const response = await fetch(
        `/habitaciones/por-ala?alaId=${alaId}&pacienteId=${pacienteId}`
      );

      const habitaciones = await response.json(); // Parseamos a JSON

      // Crea las opciones del select del form, y muestras las habitaciones
      habitaciones.forEach((h) => {
        const option = document.createElement("option");
        option.value = h.id_habitacion;
        option.textContent = `Habitación ${h.numero}`;
        habitacionSelect.appendChild(option);
      });
    } catch (error) {
      // Mostramos el error en caso de tenerlo por consola
      console.error("Error al cargar habitaciones:", error);
    }
  });
});
