import React from "react";
import TodoItem from "./TodoItem";
import styles from "./Todos.module.css";

const Todo = ({ todoList, onDeleteTodo }) => {
  return (
    <>
      <div className={styles.container}>
        <div>
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
