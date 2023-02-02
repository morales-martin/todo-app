import React, { useState } from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import DropDownMenu from "../UI/DropDownMenu";
import LabelBar from "../UI/LabelBar";

import styles from "./TodoItem.module.css";

const TodoItem = ({ todo }) => {
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

  const onUpdateTodo = async (todo) => {
    try {
      await API.graphql({
        query: mutations.updateTodo,
        variables: {
          input: { ...todo },
        },
      });

      console.log(todo);
      console.log("Todo successfully updated!");
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
    }
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
          <DropDownMenu
            options={["Add Category"]}
            className={styles.dropDownMenu}
          />
        </div>
      </div>
    </>
  );
};

export default TodoItem;
