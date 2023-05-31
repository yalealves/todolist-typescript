import React, { useContext, useState } from 'react'

import { IoMdCheckmarkCircleOutline, IoMdTrash, IoMdClose, IoMdCheckmark } from 'react-icons/io';
import { ToDoContext } from '../context/ToDoContext';


interface ITodoItemProps {
    id: number;
    text: string;
    completed: boolean;
}


const TodoItem: React.FC<ITodoItemProps> = ({ id, text, completed }) => {

    const { handleToggleTask, setTasks, setErrorMessage, tasks } = useContext(ToDoContext);
    const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

    const confirmDeleteTask = () => {
        const updatedtasks = tasks.filter(task => task.id !== deleteConfirmation);
        setTasks(updatedtasks);
        setErrorMessage('');
        setDeleteConfirmation(null);
    };

    const cancelDeleteTask = () => {
        setDeleteConfirmation(null);
    };

    const handleDeleteTask = (id: number) => {
        setDeleteConfirmation(id);
    };

    return (
        <li
            className={`todo-item ${completed ? 'completed' : ''}`}
        >
            <span className="todo-text">
                {deleteConfirmation === id ? (
                    <>
                        <span className="delete-confirmation-message">Are you sure?</span>
                    </>
                ) : (
                    text
                )}
            </span>
            <div className="action-icons">
                {!deleteConfirmation && (
                    <button className="action-button" onClick={() => handleToggleTask(id)}>
                        <IoMdCheckmarkCircleOutline className="action-icon" />
                    </button>
                )}
                {!deleteConfirmation && (
                    <button className="action-button" onClick={() => handleDeleteTask(id)}>
                        <IoMdTrash className="action-icon" />
                    </button>
                )}
                {deleteConfirmation === id && (
                    <div className="delete-confirmation">
                        <button className="confirm-delete-button action-button" onClick={confirmDeleteTask}>
                            <IoMdCheckmark className="confirm-delete-icon action-icon" />
                        </button>
                        <button className="cancel-delete-button action-button" onClick={cancelDeleteTask}>
                            <IoMdClose className="cancel-delete-icon action-icon" />
                        </button>
                    </div>
                )}
            </div>
        </li>
    )
}

export default TodoItem