import React, { useState } from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import DropDownMenu from "../UI/DropDownMenu";

import styles from "./TodoItem.module.css";

const TodoItem = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const onUpdateTodo = async (event) => {
    let newCompleteValue = !isCompleted;
    setIsCompleted(newCompleteValue);
    todo.completed = newCompleteValue;

    const todoInput = { id: todo.id, completed: newCompleteValue };

    try {
      await API.graphql({
        query: mutations.updateTodo,
        variables: {
          input: { ...todoInput },
        },
      });

      console.log(todoInput);
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
              onClick={onUpdateTodo}
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
            <DropDownMenu options={["Add Category"]} className={styles.dropDownMenu} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
