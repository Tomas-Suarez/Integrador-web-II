//Nos sirve para mostrar la notifacion flotante, que tiene duracion de 6 segundos

document.addEventListener("DOMContentLoaded", () => {
  const alerta = document.getElementById('error-admision');
  if (alerta) {
    setTimeout(() => {
      alerta.style.opacity = '0';
      setTimeout(() => alerta.remove(), 1000);
    }, 6000);
  }
});