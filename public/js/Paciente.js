document.addEventListener("DOMContentLoaded", () => {
  // Pasamos a variables los elementos por su ID
  const formPaciente = document.getElementById("form-paciente");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");
  const crearBtn = document.getElementById("btn-abrir-crearPaciente");

  // Limpieza de formulario y preparacion para cuando se cree un nuevo paciente
  const limpiarFormulario = () => {
    formPaciente.reset(); // Limpiamos los campos
    document.getElementById("edit-id").value = ""; // Reseteamos el id oculto
    formPaciente.action = "/pacientes/registro"; // Le pasamos la accion al form, ahora seria de registro
  };

  // Al hacer click en el boton de registro, utilizamos las funciones que tengo arriba y mostramos el modal
  crearBtn.addEventListener("click", () => {
    limpiarFormulario();
    modal.classList.remove("hidden");
  });

  // Agregamos las funciones al boton de editar paciente
  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pacienteId = btn.dataset.id; //  Obtenemos el id del paciente seleccionado

      formPaciente.action = `/pacientes/actualizar/${pacienteId}`; // Utilizamos la accion de UPDATE de paciente,

      // LLenamos los demas campos que posee el paciente del cual que seleccionamos
      document.getElementById("edit-id").value = pacienteId;
      document.getElementById("edit-nombre").value = btn.dataset.nombre || "";
      document.getElementById("edit-apellido").value =
        btn.dataset.apellido || "";
      document.getElementById("edit-documento").value =
        btn.dataset.documento || "";
      document.getElementById("edit-telefono").value =
        btn.dataset.telefono || "";
      document.getElementById("edit-domicilio").value =
        btn.dataset.domicilio || "";

      // Los datos los formateamos a la fecha de nacimiento del paciente
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

      document.getElementById("edit-estatura").value =
        btn.dataset.estatura || "";
      document.getElementById("edit-peso").value = btn.dataset.peso || "";

      const genero = btn.dataset.genero || "Masculino";
      document.getElementById("edit-genero").value = [
        "Masculino",
        "Femenino",
      ].includes(genero)
        ? genero
        : "Masculino";
      document.getElementById("edit-seguro").value =
        btn.dataset.id_seguro || "null";

      // Mostramos el modal con los datos cargados del paciente
      modal.classList.remove("hidden");
    });
  });

  // Funcionamiento para cerrar el modal al hacer click
  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
