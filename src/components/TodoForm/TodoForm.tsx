import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/slice/todoSlice";
import { AppDispatch } from "../../redux/store";
import "./TodoForm.scss";

const TodoForm: React.FC = React.memo(() => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState<{ title?: string; description?: string; dueDate?: string }>({});

    const dispatch = useDispatch<AppDispatch>();

    // useCallback prevents function recreation on every render
    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            // Validate inputs
            const newErrors: { title?: string; description?: string; dueDate?: string } = {};
            if (!title.trim()) newErrors.title = "Title is required.";
            if (!description.trim()) newErrors.description = "Description is required.";
            if (!dueDate.trim()) newErrors.dueDate = "Due date is required.";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            dispatch(addTodo({ title, description, dueDate }));

            setTitle("");
            setDescription("");
            setDueDate("");
            setErrors({});
        },
        [title, description, dueDate, dispatch]
    );

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    errors.title = ''
                }}
            />
            {errors.title && <p className="error">{errors.title}</p>}

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                    errors.description = ''

                }}
            />
            {errors.description && <p className="error">{errors.description}</p>}

            <input
                type="date"
                value={dueDate}
                onChange={(e) => {
                    setDueDate(e.target.value)
                    errors.dueDate = ''

                }}
            />
            {errors.dueDate && <p className="error">{errors.dueDate}</p>}

            <button type="submit">Add Task</button>
        </form>
    );
});

export default TodoForm;
