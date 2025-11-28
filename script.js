const tempText = document.getElementById('temp');
const humText = document.getElementById('hum');
const airText = document.getElementById('air');
const menu = document.getElementById('menuOpciones');
const panelRealtime = document.getElementById('panelRealtime');
const panelHistoricos = document.getElementById('panelHistoricos');

// === Gráfica en tiempo real ===
const chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Temperatura (°C)', data: [], borderColor: '#22d3ee', borderWidth: 2, tension: 0.3 },
            { label: 'Humedad (%)', data: [], borderColor: '#34d399', borderWidth: 2, tension: 0.3 },
            { label: 'Calidad del Aire (ppm)', data: [], borderColor: '#f87171', borderWidth: 2, tension: 0.3 }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: { ticks: { color: '#e2e8f0' }, grid: { color: '#1e293b' } },
            y: { ticks: { color: '#e2e8f0' }, grid: { color: '#1e293b' } }
        },
        plugins: {
            legend: { labels: { color: '#e2e8f0' } }
        }
    }
});

// === Gráfica histórica ===
const chartHistorico = new Chart(document.getElementById('chartHistorico'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Temperatura (°C)', data: [], borderColor: '#22d3ee', borderWidth: 2, tension: 0.3 },
            { label: 'Humedad (%)', data: [], borderColor: '#34d399', borderWidth: 2, tension: 0.3 },
            { label: 'Calidad del Aire (ppm)', data: [], borderColor: '#f87171', borderWidth: 2, tension: 0.3 }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: { ticks: { color: '#e2e8f0' }, grid: { color: '#1e293b' } },
            y: { ticks: { color: '#e2e8f0' }, grid: { color: '#1e293b' } }
        },
        plugins: {
            legend: { labels: { color: '#e2e8f0' } }
        }
    }
});

// === Actualización de datos en tiempo real ===
async function updateData() {
    const data = {
        temperature: (20 + Math.random() * 10).toFixed(1),
        humidity: (40 + Math.random() * 40).toFixed(1),
        air_quality: (200 + Math.random() * 200).toFixed(0)
    };

    const now = new Date().toLocaleTimeString();

    tempText.textContent = `${data.temperature} °C`;
    humText.textContent = `${data.humidity} %`;
    airText.textContent = `${data.air_quality} ppm`;

    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(data.temperature);
    chart.data.datasets[1].data.push(data.humidity);
    chart.data.datasets[2].data.push(data.air_quality);

    if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(d => d.data.shift());
    }

    chart.update();
}
setInterval(updateData, 2000);

// === Mostrar solo una gráfica ===
function mostrarGrafica(tipo) {
    if (tipo === 'temp') {
        chart.data.datasets[0].hidden = false;
        chart.data.datasets[1].hidden = true;
        chart.data.datasets[2].hidden = true;
    } else if (tipo === 'hum') {
        chart.data.datasets[0].hidden = true;
        chart.data.datasets[1].hidden = false;
        chart.data.datasets[2].hidden = true;
    } else if (tipo === 'air') {
        chart.data.datasets[0].hidden = true;
        chart.data.datasets[1].hidden = true;
        chart.data.datasets[2].hidden = false;
    } else if (tipo === 'all') {
        chart.data.datasets.forEach(d => d.hidden = false);
    }
    chart.update();
}

// === Datos históricos ===
function generarDatosHistoricos() {
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const labels = [];
    const year = new Date().getFullYear();

    for (let y = year - 4; y <= year; y++) {
        for (let m of meses) labels.push(`${m}-${y}`);
    }

    const temp = labels.map(() => (18 + Math.random() * 12).toFixed(1));
    const hum = labels.map(() => (35 + Math.random() * 45).toFixed(1));
    const air = labels.map(() => (150 + Math.random() * 350).toFixed(0));

    chartHistorico.data.labels = labels;
    chartHistorico.data.datasets[0].data = temp;
    chartHistorico.data.datasets[1].data = hum;
    chartHistorico.data.datasets[2].data = air;

    chartHistorico.update();
}



// Botones históricos
const btnGraficaHistorico = document.getElementById("btnGraficaHistorico");
const btnDatosHistorico = document.getElementById("btnDatosHistorico");
const contenedorGrafica = document.getElementById("contenedorGraficaHistorico");
const tablaDatos = document.getElementById("tablaDatos");
const cuerpoTabla = document.querySelector("#tablaHistorial tbody");

// Datos de ejemplo (puedes reemplazarlos con los reales)
let datosHistoricos = [
{ fecha: "2025-10-01", temperatura: 25.2, humedad: 60, aire: 150 },
{ fecha: "2025-10-02", temperatura: 27.1, humedad: 58, aire: 170 },
{ fecha: "2025-10-03", temperatura: 26.5, humedad: 62, aire: 145 },
{ fecha: "2025-10-04", temperatura: 28.3, humedad: 55, aire: 160 },
{ fecha: "2025-10-01", temperatura: 25.2, humedad: 60, aire: 150 },
{ fecha: "2025-10-02", temperatura: 27.1, humedad: 58, aire: 170 },
{ fecha: "2025-10-03", temperatura: 26.5, humedad: 62, aire: 145 },
{ fecha: "2025-10-04", temperatura: 28.3, humedad: 55, aire: 160 },
{ fecha: "2025-10-01", temperatura: 25.2, humedad: 60, aire: 150 },
{ fecha: "2025-10-02", temperatura: 27.1, humedad: 58, aire: 170 },
{ fecha: "2025-10-03", temperatura: 26.5, humedad: 62, aire: 145 },
{ fecha: "2025-10-04", temperatura: 28.3, humedad: 55, aire: 160 },
{ fecha: "2025-10-01", temperatura: 25.2, humedad: 60, aire: 150 },
{ fecha: "2025-10-02", temperatura: 27.1, humedad: 58, aire: 170 },
{ fecha: "2025-10-03", temperatura: 26.5, humedad: 62, aire: 145 },
{ fecha: "2025-10-04", temperatura: 28.3, humedad: 55, aire: 160 },
{ fecha: "2025-10-01", temperatura: 25.2, humedad: 60, aire: 150 },
{ fecha: "2025-10-02", temperatura: 27.1, humedad: 58, aire: 170 },
{ fecha: "2025-10-03", temperatura: 26.5, humedad: 62, aire: 145 },
{ fecha: "2025-10-04", temperatura: 28.3, humedad: 55, aire: 160 },
{ fecha: "2025-10-01", temperatura: 25.2, humedad: 60, aire: 150 },
{ fecha: "2025-10-02", temperatura: 27.1, humedad: 58, aire: 170 },
{ fecha: "2025-10-03", temperatura: 26.5, humedad: 62, aire: 145 },
{ fecha: "2025-10-04", temperatura: 28.3, humedad: 55, aire: 160 },
{ fecha: "2025-10-01", temperatura: 25.2, humedad: 60, aire: 150 },
{ fecha: "2025-10-02", temperatura: 27.1, humedad: 58, aire: 170 },
{ fecha: "2025-10-03", temperatura: 26.5, humedad: 62, aire: 145 },
{ fecha: "2025-10-04", temperatura: 28.3, humedad: 55, aire: 160 },
];

// Función para llenar tabla
function mostrarTablaHistorica() {
cuerpoTabla.innerHTML = "";
datosHistoricos.forEach(d => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${d.fecha}</td>
    <td>${d.temperatura}°C</td>
    <td>${d.humedad}%</td>
    <td>${d.aire}</td>
    `;
    cuerpoTabla.appendChild(fila);
});
}

// Alternar entre vista gráfica y tabla
btnGraficaHistorico.addEventListener("click", () => {
contenedorGrafica.classList.remove("oculto");
tablaDatos.classList.add("oculto");
});

btnDatosHistorico.addEventListener("click", () => {
contenedorGrafica.classList.add("oculto");
tablaDatos.classList.remove("oculto");
mostrarTablaHistorica();
});

function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Función para mostrar el panel correspondiente
function mostrarPanel(panel) {
    const panelRealtime = document.getElementById('panelRealtime');
    const panelHistoricos = document.getElementById('panelHistoricos');

    panelRealtime.classList.toggle('oculto', panel !== 'realtime');
    panelHistoricos.classList.toggle('oculto', panel !== 'historicos');

    // Si mostramos el histórico, generamos los datos
    if (panel === 'historicos') {
        generarDatosHistoricos();

        // Forzar redimensionamiento de la gráfica
        setTimeout(() => {
            chartHistorico.resize();
            chartHistorico.update();
        }, 200);
    }

    // Ocultar menú después de seleccionar
    document.getElementById('dropdownMenu').style.display = 'none';
}

