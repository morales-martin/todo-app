import React, { useState } from "react";
import styles from "./CreateTodo.module.css";
import LabelBar from "../UI/LabelBar";
import TextField from "../UI/TextField";

const CreateTodo = ({ onCreateTodo }) => {
  const [todoItem, setTodoItem] = useState({ title: "", categories: [] });

  const onTitleChange = (e) => {
    setTodoItem((prev) => ({ ...prev, title: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateTodo(todoItem);
    setTodoItem({ title: "", categories: [] });
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.formFill}>
          <div className={styles.inputContainer}>
            <TextField
              className={styles.input}
              label={"What needs to be done?"}
              changeHandler={onTitleChange}
              value={todoItem.title}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
