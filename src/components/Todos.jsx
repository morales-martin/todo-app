import React from "react";
import TodoItem from "./TodoItem";

const Todo = ({ todoList, onDeleteTodo }) => {
  return (
    <>
      <div className="h-screen">
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
