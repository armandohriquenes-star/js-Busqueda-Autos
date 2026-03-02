// Selectores
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Crear los años
const years = document.createElement('option');
const max = new Date().getFullYear();
const min = max - 10;

for (let i = max; i > min; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option);
}

// Datos para la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
});

// Event Listeners para el formulario
marca.addEventListener('input', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('input', e => {
    datosBusqueda.year = Number(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('input', e => {
    datosBusqueda.minimo = Number(e.target.value);
    filtrarAuto();
});

maximo.addEventListener('input', e => {
    datosBusqueda.maximo = Number(e.target.value);
    filtrarAuto();
});

puertas.addEventListener('input', e => {
    datosBusqueda.puertas = Number(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('input', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('input', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

function limpiarHTML() {
    const contenedor = document.querySelector('#resultado');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function mostrarAutos(autos) {
    limpiarHTML();
    const contenedor = document.querySelector('#resultado');

    autos.forEach(auto => {
        const autoHTML = document.createElement('p');
        autoHTML.innerHTML = `
            <p>${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision} - Precio: $${auto.precio} - Color: ${auto.color}</p>
        `;
        contenedor.appendChild(autoHTML);
    });
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}

// ===== MEJORA: FILTROS SIMPLIFICADOS =====
function filtrarAuto() {
    const resultado = autos
        .filter(auto => !datosBusqueda.marca || auto.marca === datosBusqueda.marca)
        .filter(auto => !datosBusqueda.year || auto.year === datosBusqueda.year)
        .filter(auto => !datosBusqueda.minimo || auto.precio >= datosBusqueda.minimo)
        .filter(auto => !datosBusqueda.maximo || auto.precio <= datosBusqueda.maximo)
        .filter(auto => !datosBusqueda.puertas || auto.puertas === datosBusqueda.puertas)
        .filter(auto => !datosBusqueda.transmision || auto.transmision === datosBusqueda.transmision)
        .filter(auto => !datosBusqueda.color || auto.color === datosBusqueda.color);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}