import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setFilter, reorderTodos } from "../../redux/slice/todoSlice";
import TodoItem from "../TodoItem/TodoItem";
import './TodoList.scss'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, filter } = useSelector((state: RootState) => state.todo);

  // Filtering logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // Default to "all"
  });

  // Handle Drag & Drop
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    dispatch(
      reorderTodos({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  return (
    <div className="todo-list">
      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => dispatch(setFilter("all"))} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => dispatch(setFilter("completed"))} className={filter === "completed" ? "active" : ""}>
          Completed
        </button>
        <button onClick={() => dispatch(setFilter("pending"))} className={filter === "pending" ? "active" : ""}>
          Pending
        </button>
      </div>

      {/* Display Count */}
      <div className="task-count">
        <p>Completed: {todos.filter(todo => todo.completed).length}</p>
        <p>Pending: {todos.filter(todo => !todo.completed).length}</p>
      </div>

      {/* Drag-and-Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TodoItem todo={todo} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No tasks found</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
