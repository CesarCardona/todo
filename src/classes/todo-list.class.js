import {Todo} from './todo.class.js';
// Este archivo agrupa todos los TODO o tareas en una lista

export class TodoList {
    constructor(){
        this.cargarLocalStorage();
        // this.todos = []; // Esto crea un array donde guardaré todos los todos para poder realizar procesos con ellos
    }

    nuevoTodo(todo){
        this.todos.push(todo); // Este método hará push del nuevo todo creado cuando lo utilice
        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id); // Este filter lo que hace es regresar un nuevo array con todos los elementos exceptuando el todo que paso como argumento
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for (const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado); // Este filter regresa un nuevo array con todos los elementos exceptuando aquellos que están completados
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        // if(localStorage.getItem('todo')){
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        //     console.log(this.todos);
        //     console.log(typeof this.todos);
        // } else{
        //     this.todos = [0];
        // }

        this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map(Todo.fromJson);
    }
}