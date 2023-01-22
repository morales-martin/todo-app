import React, { useState } from "react";
import styles from "./CreateTodo.module.css";

const CreateTodo = ({ onCreateTodo }) => {
  const [todoItem, setTodoItem] = useState("");

  const onInputChange = (e) => {
    const { value } = e.target;
    setTodoItem(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateTodo(todoItem);
    setTodoItem("");
  };

  return (
    <>
      <form className={styles.formContainer}>
        <div className={styles.formFill}>
          <h1 className={styles.title}>
            TodoList
          </h1>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="todo"
              name="todo"
              value={todoItem}
              placeholder="Create a new Todo"
              onChange={onInputChange}
            />
            <button
              className={styles.button}
              onClick={onSubmit}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
