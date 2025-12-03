// ===============================
//  GUARDAR MENSAJES EN LOCALSTORAGE
// ===============================

const form = document.getElementById("formMensajes");
const contenedor = document.getElementById("contenedorHistorial");
const btnLimpiar = document.getElementById("btnLimpiar");

// Cargar historial al abrir página
document.addEventListener("DOMContentLoaded", cargarHistorial);

// Evento guardar
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let mensaje = document.getElementById("mensaje").value;

    let nuevoMensaje = {
        nombre,
        correo,
        mensaje,
        fecha: new Date().toLocaleString()
    };

    // Obtener lista actual
    let historial = JSON.parse(localStorage.getItem("mensajes")) || [];

    // Guardar nuevo mensaje
    historial.push(nuevoMensaje);

    // Actualizar localStorage
    localStorage.setItem("mensajes", JSON.stringify(historial));

    // Mostrar en pantalla
    mostrarMensaje(nuevoMensaje);

    // Limpiar formulario
    form.reset();
});

// Mostrar mensaje en pantalla
function mostrarMensaje(data) {
    let card = document.createElement("div");
    card.classList.add("mensaje-card");

    card.innerHTML = `
        <h4>${data.nombre}</h4>
        <p>${data.mensaje}</p>
        <small>${data.correo} | ${data.fecha}</small>
    `;

    contenedor.appendChild(card);
}

// Cargar historial existente
function cargarHistorial() {
    let historial = JSON.parse(localStorage.getItem("mensajes")) || [];

    historial.forEach(msg => mostrarMensaje(msg));
}

// Botón borrar historial
btnLimpiar.addEventListener("click", () => {
    localStorage.removeItem("mensajes");
    contenedor.innerHTML = "";
});
