export default class Tarea {
    constructor(id, titulo = '', descripcion = '', prioridad = 'baja') {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.completada = false;
    }

    marcarComoCompletada() {
        this.completada = true;
    }

    cambiarPrioridad(nueva) {
        this.prioridad = nueva;
    }

    editarCampo(campo, valor) {
        this[campo] = valor;
    }
}