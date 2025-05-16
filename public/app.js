const gastos = [];

const form = document.getElementById('gasto-form');
const tablaBody = document.querySelector('#tabla-gastos tbody');
const totalSpan = document.getElementById('total');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const categoria = document.getElementById('categoria').value;

    if (!descripcion || isNaN(monto) || !categoria) return;

    const gasto = { id: Date.now(), descripcion, monto, categoria };
    gastos.push(gasto);
    agregarFila(gasto);
    actualizarTotal();

    form.reset();
});

function agregarFila(gasto) {
    const fila = document.createElement('tr');
    fila.setAttribute('data-id', gasto.id);

    fila.innerHTML = `
        <td>${gasto.descripcion}</td>
        <td>$${gasto.monto.toFixed(2)}</td>
        <td>${gasto.categoria}</td>
        <td><button class="eliminar">Eliminar</button></td>
    `;

    fila.querySelector('.eliminar').addEventListener('click', () => {
        eliminarGasto(gasto.id);
    });

    tablaBody.appendChild(fila);
}

function eliminarGasto(id) {
    const index = gastos.findIndex(g => g.id === id);
    if (index !== -1) {
        gastos.splice(index, 1);
        document.querySelector(`tr[data-id='${id}']`).remove();
        actualizarTotal();
    }
}

function actualizarTotal() {
    const total = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
    totalSpan.textContent = total.toFixed(2);
}
