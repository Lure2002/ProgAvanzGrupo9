import './App.css';
import React, { Component } from 'react';
import TaskCard from './components/TaskCard';
import Tarea from './models/Tarea';
import ThemeContext from './context/ThemeContext';
import { ThemeProvider } from './context/ThemeProvider';

let nextId = 4;

class App extends Component {
  constructor() {
    super();

    const tareasGuardadas = localStorage.getItem('tareas');
    let tareasIniciales;
    if (tareasGuardadas) {
      try {
        const tareasParseadas = JSON.parse(tareasGuardadas);
        tareasIniciales = tareasParseadas.map(
          (t) => new Tarea(t.id, t.titulo, t.descripcion, t.prioridad, t.completada, t.fecha || '')
        );
        const maxId = tareasIniciales.reduce((max, t) => (t.id > max ? t.id : max), 0);
        nextId = maxId + 1;
      } catch {
        tareasIniciales = [
          new Tarea(1, "Preparar presentación", "Hacer las diapositivas de POO", "alta", false, this.formatoFechaHoy()),
          new Tarea(2, "Leer artículo", "Sobre programación reactiva", "media", false, this.formatoFechaHoy()),
          new Tarea(3, "Revisar código", "Refactorizar componentes", "baja", false, this.formatoFechaHoy())
        ];
      }
    } else {
      tareasIniciales = [
        new Tarea(1, "Preparar presentación", "Hacer las diapositivas de POO", "alta", false, this.formatoFechaHoy()),
        new Tarea(2, "Leer artículo", "Sobre programación reactiva", "media", false, this.formatoFechaHoy()),
        new Tarea(3, "Revisar código", "Refactorizar componentes", "baja", false, this.formatoFechaHoy())
      ];
    }

    this.state = {
      tareas: tareasIniciales,
      filtroPrioridad: 'todas',
      orden: 'fechaAsc'
    };
  }

  // Formatea fecha hoy en YYYY-MM-DD
  formatoFechaHoy = () => {
    const hoy = new Date();
    return hoy.toISOString().slice(0, 10);
  };

  guardarTareasEnLocalStorage = (tareas) => {
    const tareasParaGuardar = tareas.map(({ id, titulo, descripcion, prioridad, completada, fecha }) => ({
      id, titulo, descripcion, prioridad, completada, fecha
    }));
    localStorage.setItem('tareas', JSON.stringify(tareasParaGuardar));
  };

  toggleTarea = (idTarea) => {
    const tareasActualizadas = this.state.tareas.map(t => {
      if (t.id === idTarea) t.completada = !t.completada;
      return t;
    });
    this.setState({ tareas: tareasActualizadas }, () => {
      this.guardarTareasEnLocalStorage(this.state.tareas);
    });
  };

  agregarTareaVacia = () => {
    const nueva = new Tarea(nextId++, '', '', 'baja', false, this.formatoFechaHoy());
    this.setState({ tareas: [...this.state.tareas, nueva] }, () => {
      this.guardarTareasEnLocalStorage(this.state.tareas);
    });
  };

  editarTarea = (id, campo, valor) => {
    if ((campo === 'titulo' || campo === 'descripcion' || campo === 'prioridad' || campo === 'fecha') && valor.trim() === '') {
      alert(`El campo "${campo}" no puede quedar vacío.`);
      return;
    }

    if (campo === 'fecha') {
      const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
      if (!regexFecha.test(valor)) {
        alert('Formato de fecha inválido. Use AAAA-MM-DD.');
        return;
      }
    }

    const tareasActualizadas = this.state.tareas.map(t => {
      if (t.id === id) t.editarCampo(campo, valor);
      return t;
    });
    this.setState({ tareas: tareasActualizadas }, () => {
      this.guardarTareasEnLocalStorage(this.state.tareas);
    });
  };

  eliminarTarea = (id) => {
    if (!window.confirm('¿Querés eliminar esta tarea?')) return;
    const tareasFiltradas = this.state.tareas.filter(t => t.id !== id);
    this.setState({ tareas: tareasFiltradas }, () => {
      this.guardarTareasEnLocalStorage(this.state.tareas);
    });
  };

  cambiarFiltroPrioridad = (e) => {
    this.setState({ filtroPrioridad: e.target.value });
  };

  cambiarOrden = (e) => {
    this.setState({ orden: e.target.value });
  };

  filtrarYOrdenar = () => {
    let tareas = [...this.state.tareas];

    // Filtrar
    if (this.state.filtroPrioridad !== 'todas') {
      tareas = tareas.filter(t => t.prioridad === this.state.filtroPrioridad);
    }

    // Ordenar
    switch (this.state.orden) {
      case 'fechaAsc':
        tareas.sort((a, b) => {
          const fechaA = a.fecha || '9999-12-31'; // fecha muy lejana para que tareas sin fecha queden al final
          const fechaB = b.fecha || '9999-12-31';
          return fechaA.localeCompare(fechaB);
        });
        break;
      case 'fechaDesc':
        tareas.sort((a, b) => {
          const fechaA = a.fecha || '0000-01-01'; // fecha muy vieja para que tareas sin fecha queden al principio
          const fechaB = b.fecha || '0000-01-01';
          return fechaB.localeCompare(fechaA);
        });
        break;
      // los otros casos igual
      case 'tituloAsc':
        tareas.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'tituloDesc':
        tareas.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      default:
        break;
    }

    return tareas;
  };

  render() {
    const tareasMostradas = this.filtrarYOrdenar();
    const { theme, toggleTheme } = this.context || {};

    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div style={{
            minHeight: '100vh',
            backgroundColor: theme.background,
            padding: '32px',
            color: theme.text,
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
              <button
                onClick={toggleTheme}
                aria-label="Cambiar modo oscuro o claro"
                style={{
                  padding: '10px',
                  fontSize: '20px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: theme.card,
                  color: theme.text,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                {theme.mode === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>

            <h1 style={{ marginBottom: '24px' }}>Gestor de Tareas (POO + React)</h1>

            <div style={{
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <label>
                Filtrar prioridad:{' '}
                <select
                  aria-label="Filtrar tareas por prioridad"
                  value={this.state.filtroPrioridad}
                  onChange={this.cambiarFiltroPrioridad}
                >
                  <option value="todas">Todas</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </label>

              <label>
                Ordenar por:{' '}
                <select
                  aria-label="Ordenar tareas"
                  value={this.state.orden}
                  onChange={this.cambiarOrden}
                >
                  <option value="fechaAsc">Fecha Ascendente</option>
                  <option value="fechaDesc">Fecha Descendente</option>
                  <option value="tituloAsc">Título A-Z</option>
                  <option value="tituloDesc">Título Z-A</option>
                </select>
              </label>
            </div>

            {tareasMostradas.length === 0 && (
              <p>No hay tareas para mostrar.</p>
            )}

            {tareasMostradas.map(tarea => (
              <TaskCard
                key={tarea.id}
                tarea={tarea}
                onToggle={this.toggleTarea}
                onEditar={this.editarTarea}
                onEliminar={this.eliminarTarea}
              />
            ))}
            <button
                aria-label="Agregar nueva tarea vacía"
                onClick={this.agregarTareaVacia}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  backgroundColor: theme.primary,
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                + Nueva tarea vacía
              </button>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default function AppWithTheme() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
