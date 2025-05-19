// ==========================
// INTERACCIÓN CON EL DOM
// ===========================

const welcomeTitle = document.getElementById("welcomeTitle");
const nameInput = document.getElementById("nameInput");
const submitName = document.getElementById("submitName");
const jobSection = document.getElementById("jobSelection");
const selectButtons = document.querySelectorAll(".selectJobBtn");
const jobResult = document.getElementById("jobResult");

// Al hacer click en el botón de enviar nombre
submitName.addEventListener("click", (event) => {
  event.preventDefault();

  const playerName = nameInput.value.trim();

  if (playerName !== "") {
    welcomeTitle.textContent = `Welcome, ${playerName}!`;
    localStorage.setItem("playerName", playerName);

    // Mostramos la selección de job
    jobSection.style.display = "flex";
  } else {
    alert("Por favor, ingresá tu nombre.");
  }
});

// Al hacer click en un botón de selección de job
selectButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedJob = button.getAttribute("data-job");
    const jobImg = button.getAttribute("data-img");
    const playerName = localStorage.getItem("playerName") || "Player";

    // Mostramos el resultado
    jobResult.innerHTML = `
      <p>Hunter ${playerName}, you are a <strong>${selectedJob}</strong>!</p>
      <img src="${jobImg}" alt="Clase ${selectedJob}" style="width:150px; margin-top:10px; border-radius:8px;">
    `;
    jobResult.style.display = "block";

    // Guardamos en localStorage
    localStorage.setItem("playerJob", selectedJob);

    // Ocultamos la selección de job
    jobSection.style.display = "none";
  });
});

// ==========================
// LOGICA DE JUEGO
// ===========================


const enemies = [
    { name: "Goblin", level: 1, health: 100, damage: 10 },
    { name: "Orc", level: 2, health: 150, damage: 15 },
    { name: "Beast", level: 8, health: 200, damage: 20 },
    { name: "Dragon", level: 12, health: 300, damage: 30 },
    { name: "Demon", level: 18, health: 400, damage: 40 }
];

let isFirstFight = true;
let enemySelected = null;

// Contenedor donde mostraremos info de combate y botones
const fightSection = document.createElement("div");
fightSection.style.marginTop = "20px";
document.body.appendChild(fightSection);

// Botón pelear
const fightButton = document.createElement("button");
fightButton.classList.add("button");
fightButton.textContent = "Pelear contra un enemigo";
fightButton.style.display = "none";
document.body.appendChild(fightButton);

// Botones para pelear otra vez o salir, ocultos al inicio
const againButton = document.createElement("button");
againButton.classList.add("button");
againButton.textContent = "Pelear otra vez";
againButton.style.display = "none";
document.body.appendChild(againButton);

const exitButton = document.createElement("button");
exitButton.classList.add("button");
exitButton.textContent = "Salir del combate";
exitButton.style.display = "none";
document.body.appendChild(exitButton);


let levelPlayer = 3; // Asignar un nivel inicial al jugador

function randomEnemy() {
  if (isFirstFight) {
    isFirstFight = false;
    return enemies[0];
  }
  let randomIndex = Math.floor(Math.random() * (enemies.length));
  return enemies[randomIndex];
}

function showEnemy(enemy) {
  fightSection.innerHTML = `
    <h3>Enemigo encontrado:</h3>
    <p><b>Nombre:</b> ${enemy.name}</p>
    <p><b>Nivel:</b> ${enemy.level}</p>
    <p><b>Salud:</b> ${enemy.health}</p>
    <p><b>Daño:</b> ${enemy.damage}</p>
  `;
}

function showFightResult(canFight) {
  if (canFight) {
  levelPlayer++;
  const levelMsg = document.createElement("p");
  levelMsg.textContent = `¡Has subido de nivel! Ahora eres nivel ${levelPlayer}.`;
  fightSection.appendChild(levelMsg);
}
localStorage.setItem("playerLevel", levelPlayer);

  const resultText = canFight
    ? "¡Eres lo suficientemente fuerte para pelear!"
    : "No eres lo suficientemente fuerte para pelear contra este enemigo.";
  const p = document.createElement("p");
  p.textContent = resultText;
  fightSection.appendChild(p);
}

// Cuando el jugador elige clase, mostramos botón pelear
function showFightButton() {
  fightButton.style.display = "inline-block";
}

// Al hacer click en pelear
fightButton.addEventListener("click", () => {
  enemySelected = randomEnemy();
  fightSection.innerHTML = "";
  showEnemy(enemySelected);

  const canFight = levelPlayer >= enemySelected.level;
  showFightResult(canFight);

  fightButton.style.display = "none";
  againButton.style.display = "inline-block";
  exitButton.style.display = "inline-block";
});

// Pelear otra vez
againButton.addEventListener("click", () => {
  fightButton.style.display = "inline-block";
  againButton.style.display = "none";
  exitButton.style.display = "none";
  fightSection.innerHTML = "";
});

// Salir del combate
exitButton.addEventListener("click", () => {
  fightButton.style.display = "none";
  againButton.style.display = "none";
  exitButton.style.display = "none";
  fightSection.innerHTML = "<p>Has salido del combate, cazador.</p>";
});


// Cuando el jugador selecciona clase, mostramos el botón pelear
selectButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedJob = button.getAttribute("data-job");
    const jobImg = button.getAttribute("data-img");
    const playerName = localStorage.getItem("playerName") || "Player";

    jobResult.innerHTML = `Hunter ${playerName}, you are a ${selectedJob}! <br> <img src="${jobImg}" alt="${selectedJob}" style="width:100px; height:auto; margin-top:10px;" />`;
    jobResult.style.display = "block";

    localStorage.setItem("playerJob", selectedJob);

    jobSection.style.display = "none";

    // Asignar nivel según clase
    switch (selectedJob.toLowerCase()) {
      case "ronin":
        levelPlayer = 4;
        break;
      case "marcial artist":
        levelPlayer = 3;
        break;
      case "priest":
        levelPlayer = 2;
        break;
      case "mage":
        levelPlayer = 5;
        break;
      default:
        levelPlayer = 1;
    }

    showFightButton(); // Mostrar botón pelear
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("playerName");
  const savedJob = localStorage.getItem("playerJob");
  const savedLevel = localStorage.getItem("playerLevel");

  if (savedLevel) {
  levelPlayer = parseInt(savedLevel);
}

  if (savedName && savedJob) {
    // Mostrar mensaje de bienvenida
    welcomeTitle.textContent = `Welcome back, ${savedName}!`;

    // Ocultar input de nombre y selección de clase
    document.querySelector(".nameInputSection").style.display = "none";
    jobSection.style.display = "none";

    // Mostrar resultado de clase
    jobResult.innerHTML = `Hunter ${savedName}, you are a <strong>${savedJob}</strong>!`;
    jobResult.style.display = "block";

    // Asignar nivel según clase
    switch (savedJob.toLowerCase()) {
      case "ronin":
        levelPlayer = 4;
        break;
      case "marcial artist":
        levelPlayer = 3;
        break;
      case "priest":
        levelPlayer = 2;
        break;
      case "mage":
        levelPlayer = 5;
        break;
      default:
        levelPlayer = 1;
    }

    // Mostrar botón de pelear
    showFightButton();
  }
});

const playerInfo = document.getElementById("playerInfo");
function updatePlayerInfo() {
  const name = localStorage.getItem("playerName") || "Hunter";
  playerInfo.textContent = `${name} - Nivel ${levelPlayer}`;
}

const resetButton = document.getElementById("resetGameBtn");
exitButton.addEventListener("click", () => {
  fightButton.style.display = "none";
  againButton.style.display = "none";
  exitButton.style.display = "none";
  fightSection.innerHTML = "<p>Has salido del combate, cazador.</p>";

  // Mostrar el botón de reinicio
  resetButton.style.display = "inline-block";
});

resetButton.addEventListener("click", () => {
  // Limpiar localStorage
  localStorage.clear();

  // Reiniciar interfaz
  document.querySelector(".nameInputSection").style.display = "block";
  jobSection.style.display = "none";
  jobResult.style.display = "none";
  fightSection.innerHTML = "";
  fightButton.style.display = "none";
  againButton.style.display = "none";
  exitButton.style.display = "none";
  resetButton.style.display = "none";

  // Resetear variables
  isFirstFight = true;
  levelPlayer = 1;
  nameInput.value = "";
  welcomeTitle.textContent = "Welcome stranger!";
});