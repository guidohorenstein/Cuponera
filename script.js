const citasIniciales = [
  "🍣 Cenamos sushi",
  "🍕 Hacemos pizzas caseras",
  "🍝 Cocinamos pastas caseras",
  "🥾 Sendero a Los Chorritos",
  "🥩 Te hago un asado",
  "🌿 Trekking a Cascada Escondida",
  "💦 Trekking a Cascada Los Hornillos",
  "🍻 Vale por una puesta en pedo juntos",
  "🎶 Salimos de joda",
  "🎲 Noche de juegos de mesa",
  "📵 Noche sin celulares",
  "🎨 Vamos a pottery.art.cafe",
  "🍽️ Comida sorpresa (cada uno cocina sin saber qué)",
  "⛸️ Patinaje sobre hielo",
  "🍸 Vamos a un bar",
  "💆‍♀️ 30 minutos de masajes",
  "🎤 Show de stand-up",
  "🎳 Vamos a jugar bowling",
  "🧠 Cita creativa con plastilina",
  "🍗 Comemos en KFC",
  "🍔 Comemos en Arre",
  "🏃‍♂️ Salimos a correr juntos",
];

// 👉 Cargar citas guardadas o usar las iniciales
let citas = JSON.parse(localStorage.getItem("citas")) || [...citasIniciales];

const citaEl = document.getElementById("cita");
const btn = document.getElementById("btn");
const btnEliminar = document.getElementById("btnEliminar");

let citaActual = null;
let indexActual = null;

// 🎰 Animación tipo ruleta
function animarSeleccion(callback) {
  let repeticiones = 8;
  let i = 0;

  const intervalo = setInterval(() => {
    const random = Math.floor(Math.random() * citas.length);
    citaEl.innerText = citas[random];
    citaEl.style.filter = "blur(2px)";
    i++;

    if (i >= repeticiones) {
      clearInterval(intervalo);
      callback();
    }
  }, 120);
}

btn.addEventListener("click", () => {
  if (citas.length === 0) {
    citaEl.innerText = "Ya hicimos todas las citas 💕";
    return;
  }

  animarSeleccion(() => {
    indexActual = Math.floor(Math.random() * citas.length);
    citaActual = citas[indexActual];

    citaEl.style.filter = "none";
    citaEl.classList.remove("animate__bounceIn");
    void citaEl.offsetWidth;

    citaEl.innerText = citaActual;
    citaEl.classList.add("animate__animated", "animate__bounceIn");
  });
});

btnEliminar.addEventListener("click", () => {
  if (indexActual === null) return;

  citaEl.classList.add("animate__zoomOut");

  setTimeout(() => {
    citas.splice(indexActual, 1);

    // 💾 Guardar estado
    localStorage.setItem("citas", JSON.stringify(citas));

    citaActual = null;
    indexActual = null;

    citaEl.classList.remove("animate__zoomOut");
    citaEl.innerText =
      citas.length > 0
        ? "Cita eliminada 💘 Elegí la próxima"
        : "No quedan citas… habrá que crear más ❤️";
  }, 500);
});
