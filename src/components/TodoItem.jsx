import React, { useState } from "react";
import DropDownMenu from "../UI/DropDownMenu";
import LabelBar from "../UI/LabelBar";

import styles from "./TodoItem.module.css";

const TodoItem = ({ todo, onUpdateTodo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [categories, setCategories] = useState(todo.categories);

  const onTodoCheck = (e) => {
    setIsCompleted(e.target.checked);

    const todoInput = {
      id: todo.id,
      completed: e.target.checked,
      categories: categories,
    };

    onUpdateTodo(todoInput);
  };

  const onUpdateCategories = (categories) => {
    setCategories(categories);
    const todoInput = {
      id: todo.id,
      completed: isCompleted,
      categories: categories,
    };

    onUpdateTodo(todoInput);
  };

  return (
    <>
      <div className={styles.todoItemContainer}>
        <div className={styles.todoItemBox}>
          <div className={styles.todoItemFill}>
            <div key={todo.id} className={styles.todoItem}>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={onTodoCheck}
                className={styles.checkbox}
              />
              <span
                className="pl-3"
                style={{
                  textDecoration: isCompleted ? "line-through" : undefined,
                }}
              >
                {todo.title}
              </span>
            </div>
            <LabelBar
              className={styles.labelBar}
              chips={todo.categories}
              updateEvent={onUpdateCategories}
            />
          </div>
          {/* <DropDownMenu
            options={["Add Category"]}
            className={styles.dropDownMenu}
          /> */}
        </div>
      </div>
    </>
  );
};

export default TodoItem;