import React, { Component } from 'react';
import ThemeContext from '../context/ThemeContext';

export default class TaskCard extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      editandoCampo: null,
      valorTemporal: ''
    };
  }

  toggleCompletada = () => {
    this.props.onToggle(this.props.tarea.id);
  };

  comenzarEdicion = (campo, valorInicial) => {
    this.setState({ editandoCampo: campo, valorTemporal: valorInicial || '' });
  };

  guardarEdicion = () => {
    const { editandoCampo, valorTemporal } = this.state;
    if (editandoCampo === 'fecha' && valorTemporal === '') {
      // Si querés permitir fecha vacía, permitilo
      this.props.onEditar(this.props.tarea.id, editandoCampo, '');
    } else if (editandoCampo) {
      this.props.onEditar(this.props.tarea.id, editandoCampo, valorTemporal);
    }
    this.setState({ editandoCampo: null, valorTemporal: '' });
  };

  render() {
    const { tarea, onEliminar } = this.props;
    const { theme } = this.context;
    const { editandoCampo, valorTemporal } = this.state;

    // Manejo de color fecha si existe y es válida
    const hoy = new Date();
    let colorFecha = theme.text;
    let fechaValida = false;
    let diffDias = null;

    if (tarea.fecha) {
      const fechaTarea = new Date(tarea.fecha);
      if (!isNaN(fechaTarea)) {
        fechaValida = true;
        diffDias = Math.ceil((fechaTarea - hoy) / (1000 * 60 * 60 * 24));
        if (diffDias < 0) colorFecha = '#d32f2f'; // rojo vencida
        else if (diffDias <= 3) colorFecha = '#fbc02d'; // amarillo próxima
      }
    }

    return (
      <div
        style={{
          backgroundColor: theme.card,
          borderRadius: '12px',
          padding: '16px',
          margin: '16px auto',
          maxWidth: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow:
            theme.mode === 'dark'
              ? '0 4px 8px rgba(255,255,255,0.05)'
              : '0 4px 8px rgba(0,0,0,0.1)',
          opacity: tarea.completada ? 0.5 : 1,
          filter: tarea.completada ? 'grayscale(100%)' : 'none',
          borderLeft: tarea.completada ? `6px solid ${theme.primary}` : 'none',
        }}
      >
        <button
          onClick={this.toggleCompletada}
          aria-label={
            tarea.completada
              ? 'Marcar tarea como no completada'
              : 'Marcar tarea como completada'
          }
          aria-pressed={tarea.completada}
          style={{
            marginRight: '16px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #666',
            backgroundColor: tarea.completada ? theme.primary : 'transparent',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {tarea.completada && '✓'}
        </button>

        <div style={{ flex: 1 }}>
          <h3
            onClick={() => this.comenzarEdicion('titulo', tarea.titulo)}
            style={{
              margin: 0,
              cursor: 'pointer',
              color: theme.text,
              textDecoration: tarea.completada ? 'line-through' : 'none',
            }}
          >
            {editandoCampo === 'titulo' ? (
              <input
                type="text"
                value={valorTemporal}
                onChange={(e) => this.setState({ valorTemporal: e.target.value })}
                onBlur={this.guardarEdicion}
                autoFocus
                aria-label="Título de la tarea"
              />
            ) : (
              tarea.titulo || <em>Click para editar título</em>
            )}
          </h3>

          <p
            onClick={() => this.comenzarEdicion('descripcion', tarea.descripcion)}
            style={{ margin: '6px 0', cursor: 'pointer', color: theme.muted }}
          >
            {editandoCampo === 'descripcion' ? (
              <input
                type="text"
                value={valorTemporal}
                onChange={(e) => this.setState({ valorTemporal: e.target.value })}
                onBlur={this.guardarEdicion}
                autoFocus
                aria-label="Descripción de la tarea"
              />
            ) : (
              tarea.descripcion || <em>Click para editar descripción</em>
            )}
          </p>

          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
            Prioridad:{' '}
            {editandoCampo === 'prioridad' ? (
              <select
                aria-label="Prioridad de la tarea"
                value={valorTemporal}
                onChange={(e) => this.setState({ valorTemporal: e.target.value })}
                onBlur={this.guardarEdicion}
                autoFocus
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            ) : (
              <span
                onClick={() => this.comenzarEdicion('prioridad', tarea.prioridad)}
                style={{
                  color: theme.prioridad[tarea.prioridad],
                  cursor: 'pointer',
                }}
              >
                {tarea.prioridad}
              </span>
            )}
          </p>

          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
            Fecha de vencimiento:{' '}
            {editandoCampo === 'fecha' ? (
              <input
                type="date"
                value={valorTemporal}
                onChange={(e) => this.setState({ valorTemporal: e.target.value })}
                onBlur={this.guardarEdicion}
                autoFocus
                aria-label="Fecha de vencimiento"
                style={{ borderColor: colorFecha }}
              />
            ) : fechaValida ? (
              <span
                onClick={() => this.comenzarEdicion('fecha', tarea.fecha)}
                style={{ color: colorFecha, cursor: 'pointer' }}
              >
                {tarea.fecha}
              </span>
            ) : (
              <em
                onClick={() => this.comenzarEdicion('fecha', '')}
                style={{ color: theme.muted, cursor: 'pointer' }}
              >
                dd/mm/aaaa
              </em>
            )}
          </p>
        </div>

        <button
          onClick={() => onEliminar(tarea.id)}
          aria-label={`Eliminar tarea ${tarea.titulo}`}
          style={{
            marginLeft: '16px',
            backgroundColor: '#e53935',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            padding: '6px 12px',
            cursor: 'pointer',
            height: 'fit-content',
            alignSelf: 'flex-start',
          }}
          type="button"
        >
          Eliminar
        </button>
      </div>
    );
  }
}
