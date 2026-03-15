/* === MODELOS (Solo lógica de datos) === */

class Cuenta {
    constructor(titular) {
        this.titular = titular;
        this.saldo = 0;
    }
    depositar(m) { this.saldo += m; }
    retirar(m) {
        if (m <= this.saldo) { this.saldo -= m; return true; }
        return false;
    }
}

class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
    get total() { return this.precio * this.stock; }
}

class Estudiante {
    // Añadimos apellidos y edad como pediste
    constructor(nombre, apellidos, edad, nota) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.nota = parseFloat(nota);
    }
    get estado() { return this.nota >= 3.0 ? "Aprobado" : "Reprobado"; }
}

class Vehiculo {
    constructor(placa) {
        this.placa = placa;
        this.velocidad = 0;
    }
    acelerar() { this.velocidad += 10; }
    frenar() { if(this.velocidad > 0) this.velocidad -= 10; }
}

class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponible = true;
    }
}