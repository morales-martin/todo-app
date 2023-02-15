import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todos";
import ToolOptions from "../components/ToolOptions";
import styles from "./index.module.css";

import { listTodos, createTodo, updateTodo, deleteTodos } from "../API";

const todoMap = new Map();

export default function Home({ todos }) {
  const { data: session } = useSession();
  const [todoList, setTodoList] = useState([]);
  const [tab, setTab] = useState("all");

  // for use when user is not signed in
  useEffect(() => {
    if (session) {
      listAllTodos();
    }
  }, [session]);

  useEffect(() => {
    listAllTodos();
  }, [tab]);

  const listAllTodos = async () => {
    if (session) {
      let filter = {
        user: {
          eq: session.user.email,
        },
      };

      // filtering 'completed' status
      if (tab === "todo") {
        filter.completed = { eq: false };
      } else if (tab === "completed") {
        filter.completed = { eq: true };
      }

      await listTodos(filter).then((res) => {
        setTodoList(sortTodoList(res));
      });
    } else {
      if (tab === "todo") {
        setTodoList(
          sortTodoList(
            [...todoMap]
              .map(([key, value]) => value)
              .filter((todo) => !todo.completed)
          )
        );
      } else if (tab === "completed") {
        setTodoList(
          sortTodoList(
            [...todoMap]
              .map(([key, value]) => value)
              .filter((todo) => todo.completed)
          )
        );
      } else {
        setTodoList(sortTodoList([...todoMap].map(([key, value]) => value)));
      }
    }
  };

  const sortTodoList = (todos) => {
    return todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const onCreateTodo = async (todo) => {
    const newTodo = {
      title: todo.title,
      completed: false,
      categories: todo.categories,
    };

    if (session) {
      newTodo.user = session.user.email;
      await createTodo(newTodo).then((res) => {
        if (tab === "all") {
          listAllTodos();
        } else {
          setTab("all");
        }
      });
    } else {
      let currDate = new Date();
      newTodo.id = `todo_${todo.title.replace(" ", "")}_${currDate
        .toLocaleString()
        .replace(" ", "")}`;
      todoMap.set(newTodo.id, newTodo);

      setTab("all");
    }
  };

  const onUpdateTodo = async (todo) => {
    if (session) {
      await updateTodo({ ...todo, user: session.user.email }).then((res) =>
        listAllTodos()
      );
    } else {
      todoMap.set(todo.id, todo);
      listAllTodos();
    }
  };

  const onDeleteTodos = async (idList) => {
    if (session) {
      await deleteTodos(idList).then((res) => listAllTodos());
    } else {
      for (const id of idList) {
        todoMap.delete(id);
      }
      listAllTodos();
    }
  };

  const onFilterTodos = async (tag) => {
    if (tab === tag) return;
    setTab(tag);
  };

  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.pageContainer}>
          <h1 className={styles.title}>Todo List</h1>
          <div className={styles.contentContainer}>
            <CreateTodo onCreateTodo={onCreateTodo} />
            <Todo todoList={todoList} onUpdateTodo={onUpdateTodo} />
            <ToolOptions
              tab={tab}
              setTab={setTab}
              todoList={todoList}
              onFilterTodos={onFilterTodos}
              onDeleteTodos={onDeleteTodos}
            />
          </div>
        </div>
      </main>
    </>
  );
}
