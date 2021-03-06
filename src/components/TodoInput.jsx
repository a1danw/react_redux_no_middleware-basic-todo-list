import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTodoAction } from "../redux";
import { useDispatch } from "react-redux";

const TodoInput = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const addTodo = (todo) => dispatch(addTodoAction(todo));

  const onChange = (event) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo.trim() === "") return;
    addTodo({
      id: uuidv4(),
      name: todo,
      complete: false,
    });
    setTodo("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-div">
        <input
          type="text"
          name="todo"
          placeholder="Add a todo"
          value={todo}
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default TodoInput;
