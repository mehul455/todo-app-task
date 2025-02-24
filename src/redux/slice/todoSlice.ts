import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Defining the Todo interface to specify the structure of a todo item
interface Todo {
  id: number; // Unique identifier for the todo
  title: string; // Title of the todo item
  description: string; // Detailed description of the todo item
  completed: boolean; // Completion status of the todo
  dueDate: string; // Due date of the todo item (as a string)
}

// Defining the state structure for the Todo feature
interface TodoState {
  todos: Todo[]; // Array of todo items
  filter: "all" | "completed" | "pending"; // Filter state to control which todos are displayed
}

// Initial state with an empty todos array and a default filter of "all"
const initialState: TodoState = {
  todos: [],
  filter: "all",
};

// Creating a slice for the todo actions and state management
const todoSlice = createSlice({
  name: "todo", // The name of the slice
  initialState, // Initial state
  reducers: {
    // Action to add a new todo
    addTodo: (state, action: PayloadAction<{ title: string; description: string; dueDate: string }>) => {
      const newTodo: Todo = {
        id: Date.now(), // Using the current timestamp as the unique ID
        title: action.payload.title, // Title from the action payload
        description: action.payload.description, // Description from the action payload
        completed: false, // New todos are initially not completed
        dueDate: action.payload.dueDate, // Due date from the action payload
      };
      state.todos.push(newTodo); // Adding the new todo to the state

      // Sorting the todos by due date in ascending order after adding a new todo
      state.todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    },

    // Action to toggle the completion status of a todo
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload); // Finding the todo by ID
      if (todo) {
        todo.completed = !todo.completed; // Toggling the completion status
      }
    },

    // Action to delete a todo by its ID
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload); // Filtering out the deleted todo
    },

    // Action to set the filter state (all, completed, or pending)
    setFilter: (state, action: PayloadAction<"all" | "completed" | "pending">) => {
      state.filter = action.payload; // Updating the filter state
    },

    // Action to reorder todos (useful for drag-and-drop functionality)
    reorderTodos: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.todos.splice(sourceIndex, 1); // Removing the task from the source position
      state.todos.splice(destinationIndex, 0, movedTask); // Inserting the task at the destination position
    },
  },
});

// Exporting the action creators for use in components
export const { addTodo, toggleTodo, deleteTodo, setFilter, reorderTodos } = todoSlice.actions;

// Exporting the reducer to be added to the store
export default todoSlice.reducer;
