import React from "react";
import styles from "./ToolOptions.module.css";
import ToggleButtons from "../UI/ToggleButtons";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LoginButton from "@/UI/LoginButton";

const ToolOptions = ({ todoList, onFilterTodos, onDeleteTodos }) => {
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
        <LoginButton className={styles.loginButton} />
        <div className={styles.filterBar}>
          <ToggleButtons
            options={["all", "todo", "completed"]}
            event={onFilter}
          />
        </div>
        <div className={styles.deleteContainer}>
          <div className={styles.deleteButton}>
            <span className={styles.icon} onClick={deleteTodos}>
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolOptions;
