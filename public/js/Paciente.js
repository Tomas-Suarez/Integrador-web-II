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
      document.getElementById("edit-apellido").value = btn.dataset.apellido || "";
      document.getElementById("edit-documento").value = btn.dataset.documento || "";
      document.getElementById("edit-telefono").value = btn.dataset.telefono || "";
      document.getElementById("edit-domicilio").value = btn.dataset.domicilio || "";

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

      document.getElementById("edit-estatura").value = btn.dataset.estatura || "";
      document.getElementById("edit-peso").value = btn.dataset.peso || "";

      const genero = btn.dataset.genero || "Masculino";
      document.getElementById("edit-genero").value = ["Masculino", "Femenino"].includes(genero) ? genero : "Masculino";
      document.getElementById("edit-seguro").value = btn.dataset.id_seguro || "null";

      // Crear o actualizar input hidden _method
      let methodInput = formPaciente.querySelector('input[name="_method"]');
      if (!methodInput) {
        methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        formPaciente.appendChild(methodInput);
      }
      methodInput.value = "PUT";

      // Mostramos el modal con los datos cargados del paciente
      modal.classList.remove("hidden");
    });
  });

  // Funcionamiento para cerrar el modal al hacer click
  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Validación del form antes de enviarlo - FRONT
  formPaciente.addEventListener("submit", (e) => {
    e.preventDefault();

    const campos = [
      "edit-nombre",
      "edit-apellido",
      "edit-documento",
      "edit-fecha_nacimiento",
      "edit-estatura",
      "edit-peso",
      "edit-telefono",
      "edit-domicilio",
      "edit-seguro"
    ];

    campos.forEach(id => {
      const input = document.getElementById(id);
      input.setCustomValidity(""); // Limpiar errores anteriores

      // Limpiar el mensaje de error si el usuario empieza a escribir
      input.addEventListener("input", () => {
        input.setCustomValidity("");
      }, { once: true }); // Solo se agrega una vez por submit
    });

    let valido = true;

    // Validacion del campo nombre
    const nombreInput = document.getElementById("edit-nombre");
    const nombre = nombreInput.value.trim();
    if (nombre.length < 3 || nombre.length > 40) {
      nombreInput.setCustomValidity("El nombre debe tener entre 3 y 40 letras.");
      nombreInput.reportValidity();
      valido = false;
    }

    // Validacion del campo apellido
    const apellidoInput = document.getElementById("edit-apellido");
    const apellido = apellidoInput.value.trim();
    if (apellido.length < 3 || apellido.length > 20) {
      apellidoInput.setCustomValidity("El apellido debe tener entre 3 y 20 letras.");
      apellidoInput.reportValidity();
      valido = false;
    }
    // Validacion del campo dni
    const dniInput = document.getElementById("edit-documento");
    const dni = dniInput.value.trim();
    if (!/^\d{7,10}$/.test(dni)) {
      dniInput.setCustomValidity("El DNI debe contener entre 7 y 10 números.");
      dniInput.reportValidity();
      valido = false;
    }

    // Validacion del campo fecha nacimiento
    const fechaNacimientoInput = document.getElementById("edit-fecha_nacimiento");
    const fechaNacimiento = new Date(fechaNacimientoInput.value);
    if (fechaNacimiento > new Date()) {
      fechaNacimientoInput.setCustomValidity("La fecha de nacimiento no puede ser posterior a hoy.");
      fechaNacimientoInput.reportValidity();
      valido = false;
    }

    // Validacion del campo estatura
    const estaturaInput = document.getElementById("edit-estatura");
    const estaturaNum = parseFloat(estaturaInput.value.trim());
    if (isNaN(estaturaNum) || estaturaNum < 50 || estaturaNum > 250) {
      estaturaInput.setCustomValidity("La estatura debe estar entre 50 y 250 cm.");
      estaturaInput.reportValidity();
      valido = false;
    }

    // Validacion del campo peso
    const pesoInput = document.getElementById("edit-peso");
    const pesoNum = parseFloat(pesoInput.value.trim());
    if (isNaN(pesoNum) || pesoNum < 1 || pesoNum > 300) {
      pesoInput.setCustomValidity("El peso debe estar entre 1 y 300 kg.");
      pesoInput.reportValidity();
      valido = false;
    }

    // Validacion del campo telefono
    const telefonoInput = document.getElementById("edit-telefono");
    const telefono = telefonoInput.value.trim();
    if (telefono.length < 6 || telefono.length > 20) {
      telefonoInput.setCustomValidity("El teléfono debe tener entre 6 y 20 caracteres.");
      telefonoInput.reportValidity();
      valido = false;
    }

    // Validacion del campo domicilio
    const domicilioInput = document.getElementById("edit-domicilio");
    const domicilio = domicilioInput.value.trim();
    if (domicilio.length < 5) {
      domicilioInput.setCustomValidity("El domicilio debe tener al menos 5 caracteres.");
      domicilioInput.reportValidity();
      valido = false;
    }

    // Validacion del campo seguro
    const seguroInput = document.getElementById("edit-seguro");
    if (seguroInput.value === "") {
      seguroInput.setCustomValidity("Debe seleccionar un seguro médico o 'No posee'.");
      seguroInput.reportValidity();
      valido = false;
    }

    // Si todo esta correcto, enviamos el form
    if (valido) {
      formPaciente.submit();
    }
  });
});
