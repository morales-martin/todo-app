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
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="todo"
              name="todo"
              value={todoItem}
              placeholder="What needs to be done?"
              onChange={onInputChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
