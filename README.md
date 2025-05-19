# 🗡️ Hunter Game - Simulador de Cazadores

Un simulador interactivo en el que el jugador ingresa su nombre, elige una clase de cazador y se enfrenta a enemigos en combate. Cada victoria otorga nivel, y el progreso se guarda usando `localStorage`.

---

## 🎮 Características

- ✅ Interfaz completamente interactiva con HTML, CSS y JavaScript.
- ✅ Ingreso del nombre del jugador (guardado localmente).
- ✅ Selección de clase (Ronin, Marcial Artist, Priest o Mage), con imágenes representativas.
- ✅ Sistema de combate contra enemigos con lógica de nivel.
- ✅ Subida de nivel al ganar combates.
- ✅ Persistencia de datos con `localStorage` (nombre, clase y nivel).
- ✅ Estética dark / anime con video de fondo opcional.
- ✅ Opción para reiniciar el juego y comenzar de nuevo.

---

## 🧪 Tecnologías usadas

- HTML5
- CSS3 (con variables, animaciones y diseño responsivo)
- JavaScript (DOM, eventos, funciones, objetos, arrays)
- localStorage

---

## 📂 Estructura del proyecto

```
HunterGame/
│
├── index.html
├── /css
│   └── style.css
├── /js
│   └── main.js
├── /assets
│   ├── ronin.webp
│   ├── priest.webp
│   ├── mage.webp
│   ├── marcialArtist.webp
│   └── background.mp4 (opcional)
```

---

## 🚀 Cómo usar

1. Cloná o descargá el proyecto:
   ```bash
   git clone https://github.com/tuusuario/HunterGame.git
   ```

2. Abrí `index.html` en tu navegador (no requiere servidor).

---

## 🧠 Lógica del juego

- Si el jugador es nivel suficiente, puede vencer al enemigo y subir de nivel.
- La primera pelea siempre es contra un Goblin de nivel 1.
- Luego, los enemigos son aleatorios.
- El progreso se mantiene incluso si recargás la página.
- El botón "Reiniciar juego" permite comenzar desde cero.

---

## 📦 Entrega académica

Este proyecto fue desarrollado como parte de la **Entrega Nº2** del curso de JavaScript, cumpliendo con los siguientes puntos:

- Integración completa de HTML + CSS + JS.
- Interacción por DOM y eventos (sin prompt ni alert).
- Almacenamiento persistente en `localStorage`.
- Simulación completa de flujo de entrada → proceso → salida.
- Código separado, limpio, comentado y escalable.

---

## 🙌 Autor

**Franco David Finamore**  
[GitHub](https://github.com/tuusuario)

---

## 🖼️ Vista previa

(Agregá una captura o gif del juego aquí si querés que se vea en GitHub)
