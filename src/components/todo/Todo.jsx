import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const Todo = () => {
  // 1. Initialize State with `useState`
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  // 2. Load Tasks from Local Storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodoList(savedTodos);
    }
  }, []);

  // 3. Save Tasks to Local Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  // 4. Add New Tasks
  const addTodo = () => {
    if (inputValue.trim() === "") {
      alert("Type Something");
      return;
    }
    if (todoList.includes(inputValue.trim())) {
      alert("Task already exists");
      return;
    }
    setTodoList((prev) => [...prev, inputValue.trim()]);
    setInputValue("");
  };

  // 6. Remove Tasks
  const removeTodo = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };

  return (
    <>
      <div
        style={{ height: "20vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div>
          <h1 className="text-center">Todo App</h1>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              console.log(e.target.value);
            }}
            type="text"
          />
          <button onClick={addTodo}>Add+</button>
        </div>
      </div>

      {/* 5. Display the Task List */}
      <div className="text-center">
        <ul className="list-unstyled">
          {todoList?.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {item}
              <Button
                variant="contained"
                color="error"
                onClick={() => removeTodo(index)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
