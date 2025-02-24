import React from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";

const App: React.FC = () => {
  return (
      <div className="app">
        <h1>To-Do List</h1>
        <TodoForm />
        <TodoList />
      </div>
  );
};

export default App;
