import React, { useState } from "react";
import styles from "./ToolOptions.module.css";
import ToggleButtons from "../UI/ToggleButtons";

const ToolOptions = ({ todoList, onFilterTodos, onDeleteTodos }) => {
  const [filterStates, setFilterStates] = useState([
    "all",
    "todo",
    "completed",
  ]);

  const deleteTodos = async () => {
    onDeleteTodos(
      todoList.filter((todo) => todo.completed).map((todo) => todo.id)
    );
  };

  const onFilter = (filter) => {
    onFilterTodos(filter);
  };

  return (
    <>
      <div className={styles.optionsContainer}>
        <div className={styles.filterBar}>
          <ToggleButtons options={filterStates} event={onFilter} />
        </div>
        <div className={styles.deleteContainer}>
          <div className={styles.deleteButton}>
            <span className={styles.icon} onClick={deleteTodos}>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolOptions;
