import React, { useState } from "react";
import styles from "./CreateTodo.module.css";
import LabelBar from "../UI/LabelBar";

const CreateTodo = ({ onCreateTodo }) => {
  const [todoItem, setTodoItem] = useState({ title: "", categories: [] });

  const onCategoryChange = (values) => {
    setTodoItem((prev) => ({ ...prev, categories: values }));
  };

  const onTitleChange = (e) => {
    setTodoItem((prev) => ({ ...prev, title: e.target.value }));
  };

  const onSubmit = () => {
    onCreateTodo(todoItem);
    setTodoItem({ title: "", categories: [] });
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.formFill}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="todo"
              name="todo"
              value={todoItem.title}
              placeholder="What needs to be done?"
              onChange={onTitleChange}
              onKeyDown={(e) => (e.key === "Enter" ? onSubmit() : null)}
            />
            <LabelBar
              className={styles.formLabelBar}
              chips={todoItem.categories}
              updateEvent={onCategoryChange}
              label="Add a category or Flag"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
