import React from "react";
import styles from "./ToolOptions.module.css";

const ToolOptions = ({ todoList, onDeleteTodo }) => {
  return (
    <>
      <div className={styles.optionsContainer}>
        <div className={styles.filterBar}>All | To Do | Complete</div>
        <div className={styles.deleteContainer}>
          <div className={styles.deleteButton}>
            <span className={styles.icon} onClick={null}>
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolOptions;
