class App {
    constructor() {
        this.count = 0;
        this.tiempo = 0;
        this.intervalo = null;
    }

    // --- NAVEGACIÓN ---
    openModal(id) {
        document.getElementById(id).style.display = "flex";
    }

    closeModal(id) {
        document.getElementById(id).style.display = "none";
    }

    // --- COMPONENTES ---
    mensaje() {
        Swal.fire({
            title: "💻",
            text: "Hola mundo desde JavaScript",
            icon: "success"
        });
    }

    sumar() {
        const n1 = Number(document.getElementById("n1").value);
        const n2 = Number(document.getElementById("n2").value);
        document.getElementById("resultado").textContent = `Resultado: ${n1 + n2}`;
    }

    cambiarColor(c) {
        document.body.style.background = c;
    }

    // --- CONTADOR ---
    add() {
        this.count++;
        this.updateCountUI();
    }

    sub() {
        this.count--;
        this.updateCountUI();
    }

    resetCount() {
        this.count = 0;
        this.updateCountUI();
    }

    updateCountUI() {
        document.getElementById("count").textContent = this.count;
    }

    // --- LISTA BÁSICA ---
    agregarItem() {
        const input = document.getElementById("item");
        const text = input.value.trim();
        if (text === "") return;

        const li = document.createElement("li");
        li.textContent = text;
        document.getElementById("list").appendChild(li);
        input.value = "";
    }

    // --- LISTA CON ELIMINAR (Nivel 3) ---
    agregarConEliminar() {
        const input = document.getElementById("itemEliminar");
        const text = input.value.trim();
        
        if (text === "") {
            return Swal.fire("Aviso", "Escribe algo para agregar", "warning");
        }

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";
        li.innerHTML = `<span>${text}</span>`;

        const btnBorrar = document.createElement("button");
        btnBorrar.textContent = "Eliminar";
        btnBorrar.className = "actionBtn close";
        btnBorrar.style.margin = "0";
        btnBorrar.style.padding = "5px 10px";
        
        btnBorrar.onclick = () => li.remove();

        li.appendChild(btnBorrar);
        document.getElementById("listEliminar").appendChild(li);
        input.value = ""; 
    }

    // --- VALIDACIÓN ---
    validarFormulario() {
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const edad = document.getElementById("edad").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.length < 3) return Swal.fire("Error", "Nombre inválido", "error");
        if (!emailRegex.test(correo)) return Swal.fire("Error", "Correo inválido", "error");
        if (edad < 1) return Swal.fire("Error", "Edad inválida", "error");

        Swal.fire("Correcto", "Formulario enviado", "success");
    }

    // --- CALCULADORA ---
    calc(op) {
        const a = Number(document.getElementById("a").value);
        const b = Number(document.getElementById("b").value);
        let r = 0;

        switch(op) {
            case '+': r = a + b; break;
            case '-': r = a - b; break;
            case '*': r = a * b; break;
            case '/': r = b !== 0 ? a / b : "Error"; break;
        }
        document.getElementById("calcRes").textContent = "Resultado: " + r;
    }

    // --- TEMPORIZADOR ---
    startTimer() {
        if (this.intervalo !== null) return;
        this.intervalo = setInterval(() => {
            this.tiempo++;
            document.getElementById("tiempo").textContent = this.tiempo;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.intervalo);
        this.intervalo = null;
    }

    resetTimer() {
        this.stopTimer();
        this.tiempo = 0;
        document.getElementById("tiempo").textContent = 0;
    }
} 

// Instanciamos la clase para que el objeto "miApp" controle todo
const miApp = new App();