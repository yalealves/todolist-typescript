import React, { useContext, useState } from 'react'

import TodoList from './components/TodoList'
import { IoMdAddCircle } from 'react-icons/io';
import { ToDoContext } from './context/ToDoContext';

import "./style/App.css";

const App: React.FC = () => {

  const [inputText, setInputText] = useState('');
  const { handleAddTask, errorMessage } = useContext(ToDoContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  function handleNewTask() {
    handleAddTask(inputText);
    setInputText('');
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Todo List</h1>
      <div className="input-container">
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new todo"
          value={inputText}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleNewTask}>
          <IoMdAddCircle className="add-icon" />
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <TodoList />
    </div>
  )
}

export default App
