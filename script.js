/* // === ADIVINA EL NÚMERO ===
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
console.log('(DEBUG) Número secreto:', numeroSecreto);

// --- Pedir intento ---
let intento = prompt('Adivina el número (1-100):');
intento = Number(intento);

// --- Validar entrada ---
if (isNaN(intento)) {
  alert('⚠️ Eso no es un número. Por favor ingresa un número del 1 al 100.');
} else if (intento < 1 || intento > 100) {
  alert('⚠️ El número debe estar entre 1 y 100.');
} else if (intento === numeroSecreto) {
  alert('🎉 ¡Correcto! El número era ' + numeroSecreto);
} else if (intento > numeroSecreto) {
  alert('📈 Muy alto. Intenta un número más bajo.');
} else {
  alert('📉 Muy bajo. Intenta un número más alto.');
}

// --- Pista de cercanía ---
let diferencia = Math.abs(intento - numeroSecreto);
let cercanía = diferencia <= 10 ? '🔥 ¡Estás cerca!' : '❄️ Estás lejos';
console.log(cercanía);

// --- Segundo intento (si no acertó) ---
if (!isNaN(intento) && intento >= 1 && intento <= 100 && intento !== numeroSecreto) {
  let intento2 = prompt('Intenta de nuevo (1-100):');
  intento2 = Number(intento2);

  if (isNaN(intento2) || intento2 < 1 || intento2 > 100) {
    alert('⚠️ Entrada inválida. El número era ' + numeroSecreto);
  } else if (intento2 === numeroSecreto) {
    alert('🎉 ¡Correcto en el segundo intento! El número era ' + numeroSecreto);
  } else {
    let pista = intento2 > numeroSecreto ? 'alto' : 'bajo';
    alert(`Muy ${pista}. El número era ${numeroSecreto}`);
  }
} */

// === CALCULADORA DE DESCUENTOS ===
/* const TOTAL = Number(prompt('¿Cuál es el total de tu compra?'));
let precioFinal;

if (TOTAL > 100) {
  precioFinal = TOTAL * 0.80;
} else if (TOTAL >= 50) {
  precioFinal = TOTAL * 0.90;
} else {
  precioFinal = TOTAL;
}
 
alert(`Tu precio final es: ${precioFinal}`);
 */

// === ADIVINA EL NÚMERO - Versión DOM ===

// --- Seleccionar elementos del HTML ---
const inputIntento = document.getElementById("inputIntento");
const btnAdivinar = document.getElementById("btnAdivinar");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const historial = document.getElementById("historial");
const btnReiniciar = document.getElementById("btnReiniciar");
const tarjeta = document.getElementById("game-card");

// --- Variables del juego ---
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];

console.log("(DEBUG) Número secreto:", numeroSecreto);

// --- Tu primera función ---
function mostrarMensaje(texto, color) {
  mensaje.textContent = texto;
  mensaje.style.color = color;
}

// Prueba la función
mostrarMensaje("Tu café está listo. Escribe tu primer número.", "#4a3426");

function verificarIntento() {
  let valor = Number(inputIntento.value);

  // Validar entrada
  if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje("⚠️ Solo números del 1 al 100, por favor", "#b9770e");
    return;
  }

  // Incrementar contador
  intentos = intentos + 1;
  contador.textContent = "Sorbos: " + intentos;

  // Agregar al historial
  historialIntentos.push(valor);
  historial.textContent = "Tus números: " + historialIntentos.join(", ");

  // Comparar con el número secreto
  if (valor === numeroSecreto) {
    mostrarMensaje("🎉 ¡Café perfecto! Era el " + numeroSecreto, "#2e8b57");
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = "inline-block";
    // Celebración visual: la tarjeta se pinta de verde
    tarjeta.style.borderColor = "#2e8b57";
    tarjeta.style.boxShadow = "0 10px 30px rgba(46, 139, 87, 0.3)";
  } else if (valor > numeroSecreto) {
    let pista = obtenerPista(valor, numeroSecreto);
    mostrarMensaje("📈 Muy dulce, prueba más bajo. " + pista, "#c0392b");
  } else {
    let pista = obtenerPista(valor, numeroSecreto);
    mostrarMensaje("📉 Muy amargo, prueba más alto. " + pista, "#2e6f8c");
  }
}

// --- Pista de cercanía ---
function obtenerPista(intento, secreto) {
  let diferencia = Math.abs(intento - secreto);

  if (diferencia <= 5) {
    return "☕ ¡Recién servido!";
  } else if (diferencia <= 15) {
    return "♨️ Caliente";
  } else if (diferencia <= 30) {
    return "🥛 Tibio";
  } else {
    return "🧊 Café helado";
  }
}

btnAdivinar.addEventListener("click", verificarIntento);

// --- Enter también funciona ---
inputIntento.addEventListener("keypress", function (evento) {
  if (evento.key === "Enter") {
    verificarIntento();
  }
});

// --- Reiniciar juego ---
function reiniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  historialIntentos = [];

  contador.textContent = "Sorbos: 0";
  historial.textContent = "Tus números: ";
  mostrarMensaje("☕ Taza nueva. Adivina otra vez.", "#4a3426");

  btnAdivinar.disabled = false;
  btnReiniciar.style.display = "none";
  inputIntento.value = "";
  inputIntento.focus();

  // Resetear celebración visual
  tarjeta.style.borderColor = "#f6d2a8";
  tarjeta.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.35)";

  console.log("(DEBUG) Nuevo número secreto:", numeroSecreto);
}

btnReiniciar.addEventListener("click", reiniciarJuego);
