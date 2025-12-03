// ---------------------------------------
// Estado global: id de la reserva que se está editando
// ---------------------------------------
let reservaEditandoId = null;

// ---------------------------------------
// Utilidades para trabajar con localStorage
// ---------------------------------------
function obtenerReservas() {
    return JSON.parse(localStorage.getItem("reservas")) || [];
}

function guardarReservas(reservas) {
    localStorage.setItem("reservas", JSON.stringify(reservas));
}

// ---------------------------------------
// Al cargar la página: no mostrar nada en resultados
// ---------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const panel = document.getElementById("resultadoBusqueda");
    if (panel) {
        panel.innerHTML = "";
    }
});

// ---------------------------------------
// GUARDAR / ACTUALIZAR RESERVA (INSERTAR O EDITAR)
// ---------------------------------------
document.getElementById("formReserva").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recarga de la página

    let reservas = obtenerReservas();

    // Obtenemos los datos del formulario
    const datosFormulario = {
        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        evento: document.getElementById("evento").value.trim(),
        fecha: document.getElementById("fecha").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim()
    };

    // Referencia al botón para cambiar el texto si estamos editando
    const botonSubmit = document.querySelector("#formReserva button[type='submit']");

    if (reservaEditandoId === null) {
        // ----- INSERTAR NUEVA RESERVA -----
        const nuevaReserva = {
            id: Date.now(), // ID único interno
            ...datosFormulario
        };

        reservas.push(nuevaReserva);
        guardarReservas(reservas);

        alert("Reserva realizada correctamente.");
    } else {
        // ----- ACTUALIZAR RESERVA EXISTENTE -----
        const indice = reservas.findIndex(r => r.id === reservaEditandoId);
        if (indice !== -1) {
            reservas[indice] = {
                id: reservaEditandoId,
                ...datosFormulario
            };
            guardarReservas(reservas);
            alert("Reserva actualizada correctamente.");
        } else {
            alert("Ocurrió un problema al actualizar la reserva.");
        }

        // Salimos del modo edición
        reservaEditandoId = null;
        if (botonSubmit) botonSubmit.textContent = "Reservar";
    }

    // Limpiar formulario
    document.getElementById("formReserva").reset();

    // Opcional: si había un nombre buscado, volvemos a buscar para actualizar la vista
    const nombreBuscado = document.getElementById("buscarNombre").value.trim();
    if (nombreBuscado) {
        buscarReserva();
    }
});

// ---------------------------------------
// MOSTRAR LISTA DE RESERVAS EN EL PANEL
// (se usa después de buscar)
// ---------------------------------------
function mostrarReservasEnPanel(lista) {
    const panel = document.getElementById("resultadoBusqueda");

    if (!panel) return;

    if (!lista || lista.length === 0) {
        panel.innerHTML = `
            <div class="reserva-card">
                <h3>No se encontró la reserva</h3>
                <p>Verifica el nombre ingresado.</p>
            </div>
        `;
        return;
    }

    panel.innerHTML = lista.map(r => `
        <div class="reserva-card">
            <h3>Reserva encontrada</h3>
            <p><strong>Nombre:</strong> ${r.nombre}</p>
            <p><strong>Evento:</strong> ${r.evento}</p>
            <p><strong>Fecha:</strong> ${r.fecha}</p>
            <p><strong>Correo:</strong> ${r.correo}</p>
            <p><strong>Teléfono:</strong> ${r.telefono}</p>
            <p><strong>Descripción:</strong> ${r.descripcion}</p>
            <button class="btn-reservar" onclick="editarReserva(${r.id})">Editar</button>
            <button class="btn-limpiar" onclick="eliminarReserva(${r.id})">Eliminar</button>
        </div>
    `).join('');
}

// ---------------------------------------
// BUSCAR RESERVA POR NOMBRE
// ---------------------------------------
function buscarReserva() {
    let nombre = document.getElementById("buscarNombre").value.trim().toLowerCase();

    const reservas = obtenerReservas();

    let resultado = [];

    if (nombre) {
        resultado = reservas.filter(r =>
            r.nombre.toLowerCase().includes(nombre)
        );
    }

    mostrarReservasEnPanel(resultado);
}

// ---------------------------------------
// ELIMINAR RESERVA
// ---------------------------------------
function eliminarReserva(id) {
    if (!confirm("¿Seguro que deseas eliminar esta reserva?")) return;

    let reservas = obtenerReservas();

    // Filtramos las reservas para eliminar solo la que tiene el ID correcto
    reservas = reservas.filter(r => r.id !== id);

    // Guardamos el nuevo arreglo de reservas sin la eliminada
    guardarReservas(reservas);

    // Volver a buscar para actualizar la vista si hay texto en el buscador
    const nombreBuscado = document.getElementById("buscarNombre").value.trim();
    if (nombreBuscado) {
        buscarReserva();
    } else {
        // Si no hay búsqueda, solo limpiamos el panel
        mostrarReservasEnPanel(reservas);
    }
}

// ---------------------------------------
// EDITAR RESERVA
// ---------------------------------------
function editarReserva(id) {
    const reservas = obtenerReservas();
    const reserva = reservas.find(r => r.id === id);
    if (!reserva) {
        alert("No se encontró la reserva a editar.");
        return;
    }

    // Llenar el formulario con los datos de la reserva
    document.getElementById("nombre").value = reserva.nombre;
    document.getElementById("correo").value = reserva.correo;
    document.getElementById("telefono").value = reserva.telefono;
    document.getElementById("evento").value = reserva.evento;
    document.getElementById("fecha").value = reserva.fecha;
    document.getElementById("descripcion").value = reserva.descripcion;

    // Guardar el id que se está editando
    reservaEditandoId = id;

    // Cambiar texto del botón para indicar modo edición
    const botonSubmit = document.querySelector("#formReserva button[type='submit']");
    if (botonSubmit) botonSubmit.textContent = "Guardar cambios";

    // (Opcional) hacer scroll al formulario
    document.getElementById("formReserva").scrollIntoView({ behavior: "smooth" });
}

// ---------------------------------------
// ORDENAR RESERVAS POR NOMBRE
// ---------------------------------------
function ordenarReservas() {
    let reservas = obtenerReservas();

    // Ordena las reservas alfabéticamente por nombre
    reservas.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Guardar las reservas ordenadas en localStorage
    guardarReservas(reservas);

    // Mostrar las reservas ordenadas
    mostrarReservasEnPanel(reservas);
}
