# ✅ Gestor de Tareas (POO + React + Context)

Proyecto desarrollado como ejemplo práctico de **Programación Orientada a Objetos** y **Programación Reactiva** en React.  
Incluye también un sistema de **temas claro/oscuro con Context API**, estilos visuales modernos y componentes reutilizables.

---

## 📸 Capturas

<div align="center">
  <img src="./screenshots/dark-mode.png" width="600" alt="Modo oscuro" />
  <img src="./screenshots/light-mode.png" width="600" alt="Modo claro" />
</div>

> Si querés verlo en acción, cloná el repo y probalo localmente.

---

## 🧱 Estructura del proyecto

src/
├── App.jsx
├── models/
│ └── Tarea.js # Clase que modela el comportamiento de una tarea (POO)
├── components/
│ └── TaskCard.jsx # Tarjeta de visualización individual
├── context/
│ └── ThemeContext.js # Contexto para manejar tema oscuro/claro

---

## 💡 Funcionalidades

- ✅ Crear tareas usando **clases JS (POO)** con métodos como `marcarComoCompletada()`
- 🎯 Visualización reactiva: cuando cambia el estado, la UI se actualiza automáticamente
- 🎨 Diferenciación de prioridad con colores (alta, media, baja)
- 🌓 Soporte para **modo oscuro y claro** usando `ThemeContext`
- 💾 Código organizado, reutilizable y fácil de mantener

---

## ⚙️ Instalación y uso

```bash
git clone https://github.com/Lure2002/ProgAvanzGrupo9
cd react-app
npm install
npm start
```
