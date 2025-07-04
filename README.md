# Gestor de Tareas (POO + React + Context)

Proyecto desarrollado como ejemplo práctico de **Programación Orientada a Objetos** y **Programación Reactiva** en React.  
Incluye también un sistema de **temas claro/oscuro con Context API**, estilos visuales modernos, **persistencia local**, **filtrado**, **ordenamiento**, y **alertas visuales por vencimiento**.

---

## Estructura del proyecto

```
src/
├── App.jsx
├── models/
│   └── Tarea.js            # Clase que modela el comportamiento de una tarea (POO)
├── components/
│   └── TaskCard.jsx        # Tarjeta de visualización individual
├── context/
│   ├── ThemeContext.js     # Contexto para manejar tema oscuro/claro
│   └── ThemeProvider.js    # Lógica del cambio de tema
```

---

## Funcionalidades

- Crear, editar, marcar como completadas y eliminar tareas usando **clases JS (POO)**
- Cada tarea tiene: título, descripción, prioridad y **fecha de vencimiento opcional**
- Soporte para **modo oscuro y claro** usando Context API
- Visualización reactiva: cuando cambia el estado, la UI se actualiza automáticamente
- Diferenciación de prioridad con colores (alta, media, baja)
- Filtro por prioridad y ordenamiento por título o fecha (asc/desc)
- Alerta visual: tareas vencidas se muestran en rojo, próximas a vencer en amarillo
- **Persistencia en localStorage**: tus tareas se mantienen entre sesiones
- Mejora en **accesibilidad** con `aria-label` y controles amigables para lectores de pantalla

---

## Instalación y uso

```bash
git clone https://github.com/Lure2002/ProgAvanzGrupo9
cd react-app
npm install
npm start
```

> Requiere Node.js y npm instalados previamente.

---

## Extras para mejorar (opcional)

- Validaciones más avanzadas (campos obligatorios, fechas inválidas)
- Pruebas unitarias e integración con Jest o React Testing Library
- Migración a Hooks y custom hooks (`useReducer`, `useContext`, etc.)
- Uso de servicios externos para persistencia (MockAPI, JSONPlaceholder, etc.)

