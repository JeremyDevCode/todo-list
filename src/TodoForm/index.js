import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

function TodoForm(props) {

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const {
        addTodo,
        setOpenModal,
        contTodo,
        delTodo,
        language
    } = React.useContext(TodoContext);

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }


    const onSubmit = (event) => {
        const error = document.querySelector('.error');
        event.preventDefault();


        if(newTodoValue.length <= 0) {
            return error.innerText =`${language === 'spanish' ? '¡No puedes añadir una tarea vacia!' : "You can not add an empty task!"}`;
        
        } 
        
        if(newTodoValue.length >= 255) {
            return error.innerText =`${language === 'spanish' ? '¡La tarea es demasiado larga!' : "The task is too long!"}`;
        }

        if(delTodo(newTodoValue) === true){
            return error.innerText =`${language === 'spanish' ? 'Tienes una tarea con este nombre en tu papelera' : "You have a task with this name in your recycle bin"}` 
        } else if(contTodo(newTodoValue) === true) {
            return error.innerText =`${language === 'spanish' ? '¡Ya tienes una tarea con este nombre!' : "You already have a task with this name!"}`;
        } else {
            addTodo(newTodoValue);
            setOpenModal(false);
        }
        
    }

    const onCancel = () => {
        setOpenModal(false);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>{language === 'spanish' ? 'Escribe una nueva tarea' : 'Write a new task'}</label>
            <p className="error"></p>
            <textarea
                value = {newTodoValue} 
                onChange={onChange}
                placeholder={language === 'spanish' ? 'Lavar los platos' : 'Do the washing up'}
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="submit"
                    onClick={onSubmit}
                    className="TodoForm-button TodoForm-button--add"
                >
                {language === 'spanish' ? 'Añadir' : 'Add' }
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="TodoForm-button TodoForm-button--cancel"
                >
                {language === 'spanish' ? 'Cancelar' : 'Cancel'}
                </button>
            </div>
        </form>
    );
}

export { TodoForm };