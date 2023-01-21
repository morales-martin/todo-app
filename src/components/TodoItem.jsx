import React, { useState } from "react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";

const TodoItem = ({ todo, onDeleteTodo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const onUpdateTodo = async (event) => {
    setIsCompleted(event.target.checked);

    const input = { id: todo.id, completed: event.target.checked };

    try {
      await API.graphql({
        query: mutations.updateTodo,
        variables: {
          input: { input },
        },
      });

      console.log("Todo successfully updated!");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className=" relative justify-center mt-6 w-96">
          <div className="bg-white px-8 pt-8 pb-6 rounded-md text-gray-500 shadow-lg">
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
                className="h-4 w-4"
              />
              <span className="pl-3">{todo.title}</span>
            </div>
          </div>
          <div className="absolute flex top-5 right-0 p-3 space-x-2">
            <span
              className="text-red-500 cursor-pointer"
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
