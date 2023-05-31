import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { ToDoContext } from '../context/ToDoContext';


const TodoList: React.FC = () => {
    const { tasks } = useContext(ToDoContext);

    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <TodoItem key={task.id} id={task.id} text={task.text} completed={task.completed} />
            ))}
        </ul>
    );
};

export default TodoList;