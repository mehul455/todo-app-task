import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../../redux/slice/todoSlice";
import { AppDispatch } from "../../redux/store";
import './TodoItem.scss'
interface TodoProps {
  todo: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dueDate:string
  };
}

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <p>{todo.dueDate}</p>
      </div>
      <div className="actions">
        <button onClick={() => dispatch(toggleTodo(todo.id))}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
