import React, { useState } from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";

import styles from './TodoItem.module.css';

const TodoItem = ({ todo, onDeleteTodo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const onUpdateTodo = async (event) => {
    setIsCompleted(event.target.checked);

    const todoInput = { id: todo.id, completed: event.target.checked };

    try {
      await API.graphql({
        query: mutations.updateTodo,
        variables: {
          input: { ...todoInput },
        },
      });

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
            <div
              key={todo.id}
              style={{
                textDecoration: isCompleted ? "line-through" : undefined,
              }}
            >
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={onUpdateTodo}
                className={styles.checkbox}
              />
              <span className="pl-3">{todo.title}</span>
            </div>
          </div>
          <div className={styles.iconContainer}>
            <span
              className={styles.icon}
              onClick={() => onDeleteTodo(todo.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
