// Acá en el componente debo crear cositas que se harán en el HTML
import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros =  document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) =>{
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>    
    `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', (event)=>{ // Event me indica la tecla que presionó el usuario
    // console.log(event); 
    if(event.keyCode === 13 && txtInput.value.length > 0){ // event.keycode hace referencia al tipo de tecla que presionó el usuario, en este caso enter
        const nuevoTodo = new Todo(txtInput.value); // Esto crea una nueva instancia de Todo o tarea en memoria que guarda el valor ingresado por el usuario
        todoList.nuevoTodo(nuevoTodo); // Esto usa la variable todoList del index.js para crear una instancia de TodoList y ejecutar el método nuevoTodo, lo cual agrega el nuevo todo a la lista
        crearTodoHtml(nuevoTodo); // Esto utiliza la función crearTodoHtml para agregar el nuevo todo creado al archivo HTML
        txtInput.value = ''; // Esto resetea el valor del input luego de que el usuario presione enter
    }
});

divTodoList.addEventListener('click', (event) =>{
    // console.log(event.target.localName); // Esto me permite saber a que elemento le hice clic exactamente
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')){ // Clic en el check
        todoList.marcarCompletado(todoId); // Ejecuto el método marcarCompletado
        todoElemento.classList.toggle('completed'); // Agrego o quito la clase completed
    } else if (nombreElemento.includes('button')){ // Click en el boton
        todoList.eliminarTodo(todoId); // Utilizo el método eliminarTodo para filtrar el array y eliminar el todo elegido
        divTodoList.removeChild(todoElemento);
    } 
});

btnBorrar.addEventListener('click', () =>{
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length - 1; i >= 0; i-- ){ // Itero los elementos de forma invertida para evitar errores
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){ // Si el elemento tiene la clase completed borro el hijo
            divTodoList.removeChild(elemento);
        }
    }
});


// Este es el evento de filtros
ulFiltros.addEventListener('click', (event) =>{
    const filtro = event.target.text;

    anchorFiltros.forEach((elem) => {elem.classList.remove('selected')}); // Esto le quita la clase selected a todos los botones
    event.target.classList.add('selected'); // Esto le agrega la clase al elemento al que le hice clic

    for (const elemento of divTodoList.children){
        elemento.classList.remove('hidden'); // Elimino la clase hidden para mostrar los completados
        const completado = elemento.classList.contains('completed'); // Creo una variable donde almaceno los elementos completados

        switch(filtro){ // Creo un switch que recibirá el filtro como argumento
            case 'Pendientes':  // Si el filtro es Pendientes
            if(completado){ // Si el elemento contiene la clase completed
                elemento.classList.add('hidden'); // Elimino la clase hidden de dichos elementos
            }
            break;
            
            case 'Completados': // Si el filtro es Completados
            if(!completado){ // Si el elemento NO contiene la clase completed
                elemento.classList.add('hidden'); // Elimino la clase hidden de dichos elementos
            }
        }
    }
});

