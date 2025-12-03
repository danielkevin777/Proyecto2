// Definir los descuentos y descripciones por tipo de promoción
const promociones = {
    "1": { tipo: "Tipo A", descripcion: "Esta promoción ofrece un 10% de descuento en todos los servicios." },
    "2": { tipo: "Tipo B", descripcion: "Esta promoción ofrece un 20% de descuento en todos los servicios." },
    "3": { tipo: "Tipo C", descripcion: "Esta promoción ofrece un 30% de descuento en todos los servicios." }
};

// Al cargar la página, mostrar las promociones registradas
document.addEventListener("DOMContentLoaded", function() {
    mostrarPromociones();
});

// Función para mostrar la descripción y el descuento al seleccionar una promoción
document.getElementById("tipoPromo").addEventListener("change", function() {
    const tipo = this.value;
    const descuentoInput = document.getElementById("descuento");
    const descripcionPromo = document.getElementById("descripcionPromo");

    if (tipo) {
        // Si se seleccionó un tipo válido, mostrar la descripción correspondiente
        descripcionPromo.textContent = promociones[tipo].descripcion;
    } else {
        // Si no hay tipo seleccionado, limpiar la descripción
        descripcionPromo.textContent = '';
    }
});

// Manejar el formulario (Aplicar promoción)
document.getElementById("formPromo").addEventListener("submit", function(e) {
    e.preventDefault();

    const tipo = document.getElementById("tipoPromo").value;
    const descuento = document.getElementById("descuento").value;

    if (tipo && descuento) {
        // Guardar la promoción en localStorage
        const promoGuardada = promociones[tipo];
        const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

        // Simulamos que guardamos en localStorage
        let promocionesGuardadas = JSON.parse(localStorage.getItem("promociones")) || [];
        promocionesGuardadas.push({ ...promoGuardada, descuento });
        localStorage.setItem("promociones", JSON.stringify(promocionesGuardadas));

        // Mostrar el mensaje de promoción guardada
        mensajeConfirmacion.textContent = `¡Promoción ${promoGuardada.tipo} guardada exitosamente con un ${descuento}% de descuento!`;

        // Limpiar el formulario
        limpiarFormulario();
        mostrarPromociones();
    } else {
        alert("Por favor, selecciona un tipo de promoción.");
    }
});

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("formPromo").reset();
    document.getElementById("descripcionPromo").textContent = '';
    document.getElementById("mensajeConfirmacion").textContent = '';
}

// Mostrar promociones registradas
function mostrarPromociones() {
    const contenedorPromos = document.getElementById("contenedorPromos");
    const promocionesGuardadas = JSON.parse(localStorage.getItem("promociones")) || [];

    contenedorPromos.innerHTML = '';  // Limpiar el contenedor

    promocionesGuardadas.forEach(promo => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${promo.tipo}</h3>
            <p><strong>Descuento:</strong> ${promo.descuento}%</p>
        `;

        contenedorPromos.appendChild(card);
    });
}
