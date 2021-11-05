
// Este archivo exporta la clase con el esqueleto de cada TODO o tarea por hacer

export class Todo {
    static fromJson({id, tarea, completado, creado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;
        return tempTodo;
    }
    constructor(tarea){ // Tarea hace referencia al nombre de la tarea o lo que se debe hacer
        this.tarea = tarea; // Acá el valor es igual a tarea ya que lo obtendré cuando cree la instancia y no tengo un valor inicial por defecto
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }

    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}