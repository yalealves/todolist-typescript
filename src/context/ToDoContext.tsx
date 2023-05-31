import React, { createContext, useState, useEffect } from "react";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface ToDoContextProps {
    tasks: Task[];
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handleAddTask: (inputText: string) => void;
    handleToggleTask: (id: number) => void;
}

interface ToDoProviderProps {
    children: React.ReactNode;
}

export const ToDoContext = createContext<ToDoContextProps>({} as ToDoContextProps);

export const ToDoProvider: React.FC<ToDoProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const tasksLocalStorage = localStorage.getItem('tasks');
        if (tasksLocalStorage) {
            setTasks(JSON.parse(tasksLocalStorage));
        }
    }, []);

    useEffect(() => {
        if (tasks.length !== 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);





    const handleAddTask = (inputText: string) => {
        if (inputText.trim() === '') {
            setErrorMessage('Please enter a task.');
            return;
        }

        if (tasks.find(task => task.text === inputText.trim())) {
            setErrorMessage('Task already exists.');
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            text: inputText.trim(),
            completed: false
        };
        setTasks([...tasks, newTask]);
        setErrorMessage('');
    };

    const handleToggleTask = (id: number) => {
        const updatedtasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }
            return task;
        });

        if (updatedtasks.find(task => task.id === id)?.completed) {
            const completedTask = updatedtasks.find(task => task.id === id);
            const updatedtasksWithoutCompleted = updatedtasks.filter(task => task.id !== id);
            setTasks([...updatedtasksWithoutCompleted, completedTask!]);
        } else {
            setTasks(updatedtasks);
        }
    };




    return (
        <ToDoContext.Provider
            value={{
                tasks,
                setTasks,
                errorMessage,
                handleAddTask,
                handleToggleTask,
                setErrorMessage
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};
