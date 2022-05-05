import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [ediTodo, setEdiTodo] = useState(null);

  const checkName = (e) => {
    setName(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!ediTodo) {
      setTodos([
        ...todos,
        {
          id: Math.floor(Math.random() * 100) + 1,
          title: name,
          completed: false,
        },
      ]);
      setName("");
    } else {
      updateTodo(name, ediTodo.id);
    }
  };

  const completedTodo = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const editTodo = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEdiTodo(findTodo);
  };

  const updateTodo = (title, id) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id } : todo
    );
    setTodos(newTodo);
    setEdiTodo("");
  };

  useEffect(() => {
    if (ediTodo) {
      setName(ediTodo.title);
    } else {
      setName("");
    }
  }, [setName, ediTodo]);

  const deleteTodo = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>
        <u>
          <center>Todo List</center>
        </u>
      </h1>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={formSubmit}>
            <input
              style={{ width: "250px" }}
              type="text"
              placeholder="Enter a todo here...."
              value={name}
              required
              onChange={checkName}
            />
            <button type="submit" value="Submit">
              {ediTodo ? "Update" : "Add Todo"}
            </button>
          </form>
          {todos.map((todo) => (
            <div className="container">
              <li key={todo.id}>
                <input
                  style={{ border: "none", background: "none" }}
                  type="text"
                  value={todo.title}
                  required
                  className={`${todo.completed ? "complete" : ""}`}
                  onChange={(e) => e.preventDefault()}
                />
              </li>
              <button
                type="submit"
                value="Submit"
                onClick={() => completedTodo(todo)}
              >
                Complete
              </button>
              <button
                type="submit"
                value="Submit"
                onClick={() => editTodo(todo)}
              >
                Edit
              </button>
              <button
                type="submit"
                value="Submit"
                onClick={() => deleteTodo(todo)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
