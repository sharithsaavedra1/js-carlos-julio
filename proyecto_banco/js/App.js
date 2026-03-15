/* === APP / CONTROLADOR (Interfaz y DOM) === */

class UI {
    constructor() {
        this.cuentas = [];
        this.productos = [];
        this.estudiantes = [];
        this.carrito = [];
        this.vehiculos = [];
        this.libros = [];
    }

    showSection(id) {
        document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
        document.getElementById(id).style.display = 'block';
    }

    // --- Lógica Banco ---
    addCuenta() {
        const input = document.getElementById('bn-titular');
        if (!input.value) return Swal.fire("Error", "Ingresa un titular", "error");
        this.cuentas.push(new Cuenta(input.value));
        input.value = '';
        this.renderBanco();
    }

    async operarBanco(idx, op) {
        const { value: monto } = await Swal.fire({
            title: op === 'dep' ? 'Depositar' : 'Retirar',
            input: 'number',
            showCancelButton: true
        });
        if (monto) {
            const m = parseFloat(monto);
            if (op === 'dep') this.cuentas[idx].depositar(m);
            else if (!this.cuentas[idx].retirar(m)) return Swal.fire("Error", "Saldo insuficiente", "error");
            this.renderBanco();
        }
    }

    renderBanco() {
        const div = document.getElementById('list-banco');
        div.innerHTML = this.cuentas.map((c, i) => `
            <div class="item-card">
                <h4>Titular: ${c.titular}</h4>
                <p>Saldo: <strong>$${c.saldo}</strong></p>
                <button class="btn-small bg-success" onclick="ui.operarBanco(${i}, 'dep')">Ingresar</button>
                <button class="btn-small bg-danger" onclick="ui.operarBanco(${i}, 'ret')">Retirar</button>
            </div>
        `).join('');
    }

    // --- Lógica Inventario ---
    addProducto() {
        const n = document.getElementById('inv-nombre').value;
        const p = document.getElementById('inv-precio').value;
        const s = document.getElementById('inv-stock').value;
        if (!n || !p || !s) return Swal.fire("Aviso", "Completa los campos", "warning");
        this.productos.push(new Producto(n, parseFloat(p), parseInt(s)));
        this.renderInventario();
    }

    renderInventario() {
        const div = document.getElementById('list-inventario');
        div.innerHTML = this.productos.map(p => `
            <div class="item-card">
                <h4>${p.nombre}</h4>
                <p>Precio: $${p.precio} | Stock: ${p.stock}</p>
                <p>Valor Total: <strong>$${p.total}</strong></p>
            </div>
        `).join('');
    }

    // --- Lógica Estudiantes (Actualizada con Apellidos y Edad) ---
    addEstudiante() {
        const n = document.getElementById('est-nombre').value;
        const a = document.getElementById('est-apellido').value;
        const e = document.getElementById('est-edad').value;
        const nota = document.getElementById('est-nota').value;
        
        if (!n || !a || !e || !nota) return Swal.fire("Aviso", "Completa todos los datos del estudiante", "warning");
        
        this.estudiantes.push(new Estudiante(n, a, e, nota));
        this.renderEstudiantes();
        
        // Limpiar campos
        ['est-nombre', 'est-apellido', 'est-edad', 'est-nota'].forEach(id => document.getElementById(id).value = '');
    }

    renderEstudiantes() {
        const div = document.getElementById('list-estudiantes');
        div.innerHTML = this.estudiantes.map(e => `
            <div class="item-card">
                <h4>${e.nombre} ${e.apellidos}</h4>
                <p>Edad: ${e.edad} años</p>
                <p>Nota: ${e.nota}</p>
                <span class="status-badge ${e.estado === 'Aprobado' ? 'bg-success' : 'bg-danger'}">${e.estado}</span>
            </div>
        `).join('');
    }

    // --- Lógica Carrito (Actualizada con Realizar Pedido) ---
    addAlCarrito() {
        const n = document.getElementById('car-nombre').value;
        const p = document.getElementById('car-precio').value;
        if (!n || !p) return;
        this.carrito.push({ nombre: n, precio: parseFloat(p) });
        this.renderCarrito();
    }

    eliminarDelCarrito(idx) {
        this.carrito.splice(idx, 1);
        this.renderCarrito();
    }

    realizarPedido() {
        if (this.carrito.length === 0) return Swal.fire("Carrito vacío", "Añade productos antes de comprar", "info");
        
        Swal.fire({
            title: "¡Pedido Exitoso!",
            text: "Tu compra se ha procesado correctamente ✨",
            icon: "success",
            confirmButtonColor: "#f06292"
        });
        
        this.carrito = [];
        this.renderCarrito();
    }

    renderCarrito() {
        const div = document.getElementById('list-carrito');
        const totalSpan = document.getElementById('car-total');
        const btnPedido = document.getElementById('btn-pedido');
        let total = 0;
        
        div.innerHTML = this.carrito.map((item, i) => {
            total += item.precio;
            return `
                <div class="item-card">
                    <h4>${item.nombre}</h4>
                    <p>Precio: $${item.precio}</p>
                    <button class="btn-small bg-danger" onclick="ui.eliminarDelCarrito(${i})">Eliminar</button>
                </div>
            `;
        }).join('');
        
        totalSpan.textContent = `$${total}`;
        // Mostrar/Ocultar botón de pedido si hay items
        btnPedido.style.display = this.carrito.length > 0 ? "inline-block" : "none";
    }

    // --- Lógica Vehículos ---
    addVehiculo() {
        const p = document.getElementById('veh-placa').value;
        if (!p) return;
        this.vehiculos.push(new Vehiculo(p));
        this.renderVehiculos();
    }

    controlarVeh(idx, op) {
        if (op === 'acc') this.vehiculos[idx].acelerar();
        else this.vehiculos[idx].frenar();
        this.renderVehiculos();
    }

    renderVehiculos() {
        const div = document.getElementById('list-vehiculos');
        div.innerHTML = this.vehiculos.map((v, i) => `
            <div class="item-card">
                <h4>Vehículo: ${v.placa}</h4>
                <p>Velocidad: <strong>${v.velocidad} km/h</strong></p>
                <button class="btn-small bg-success" onclick="ui.controlarVeh(${i}, 'acc')">Acelerar</button>
                <button class="btn-small bg-danger" onclick="ui.controlarVeh(${i}, 'fre')">Frenar</button>
            </div>
        `).join('');
    }

    // --- Lógica Biblioteca ---
    addLibro() {
        const t = document.getElementById('lib-titulo').value;
        const a = document.getElementById('lib-autor').value;
        if (!t || !a) return;
        this.libros.push(new Libro(t, a));
        this.renderBiblioteca();
    }

    prestarLibro(idx) {
        this.libros[idx].disponible = !this.libros[idx].disponible;
        this.renderBiblioteca();
    }

    renderBiblioteca() {
        const div = document.getElementById('list-biblioteca');
        div.innerHTML = this.libros.map((l, i) => `
            <div class="item-card">
                <h4>${l.titulo}</h4>
                <p>Autor: ${l.autor}</p>
                <p>Estado: <span class="status-badge ${l.disponible ? 'bg-success' : 'bg-danger'}">
                    ${l.disponible ? 'Disponible' : 'Prestado'}
                </span></p>
                <button class="btn-small" onclick="ui.prestarLibro(${i})">
                    ${l.disponible ? 'Prestar' : 'Devolver'}
                </button>
            </div>
        `).join('');
    }
}

const ui = new UI();