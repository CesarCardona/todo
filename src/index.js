// Esto me permite importar módulos o funciones de otros archivos para usarlas en este archivo
import './styles.css';
import html from "./index.html";
import { Todo, TodoList } from './classes';
import {crearTodoHtml} from './js/componentes.js';

export const todoList = new TodoList(); // Creo instancia de la clase TodoList

// todoList.todos.forEach(todo => crearTodoHtml(todo)); // Esto crear un todo en el HTML, por cada elemento existente en el localStorage

// Protip: Si tengo un solo argumento que quiero enviar dentro de otra función puedo obviar el argumento y la función flecha ya que el foreach automáticamente regresará el primer argumento que le llega, esto solo funciona si se utiliza un solo argumento
todoList.todos.forEach(crearTodoHtml);
// console.log(todoList.todos);