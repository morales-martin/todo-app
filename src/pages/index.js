import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todos";
import ToolOptions from "../components/ToolOptions";
import styles from "./index.module.css";

import { Amplify, API } from "aws-amplify";
import awsconfig from "../aws-exports";

import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

Amplify.configure(awsconfig);
const todoMap = new Map();

export default function Home({ todos }) {
  const { data: session } = useSession();
  const [todoList, setTodoList] = useState([]);
  const [tab, setTab] = useState("all");

  // for use when user is not signed in
  useEffect(() => {
    if (session) {
      listTodos();
    }
  }, [session]);

  const listTodos = async () => {
    if (session) {
      let filter = {
        user: {
          eq: session.user.email,
        },
      };

      try {
        const todoData = await API.graphql({
          query: queries.listTodos,
          variables: { filter: filter },
        });

        setTodoList(sortTodoList(todoData.data.listTodos.items));
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setTodoList(sortTodoList([...todoMap].map(([key, value]) => value)));
    }
  };

  const sortTodoList = (todos) => {
    return todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const onCreateTodo = async (todo) => {
    setTab("all");
    const newTodo = {
      title: todo.title,
      completed: false,
      categories: todo.categories,
    };

    if (session) {
      // instantiate todo object from input
      newTodo.user = session.user.email;
      // add todo to backend via api
      try {
        await API.graphql({
          query: mutations.createTodo,
          variables: { input: newTodo },
        });

        listTodos();

        console.info("Successfully created a todo!");
      } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
      }
    } else {
      let currDate = new Date();
      newTodo.id = `todo_${todo.title.replace(
        " ",
        ""
      )}_${currDate.toLocaleString().replace(" ","")}`;
      console.log(newTodo);
      todoMap.set(newTodo.id, newTodo);

      listTodos();
    }
  };

  const onUpdateTodo = async (todo) => {
    if (session) {
      try {
        await API.graphql({
          query: mutations.updateTodo,
          variables: {
            input: { ...todo, user: session.user.email },
          },
        });

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

        const newTodoData = await API.graphql({
          query: queries.listTodos,
          variables: { filter: filter },
        });

        let sortedList = sortTodoList(newTodoData.data.listTodos.items);

        setTodoList(sortedList);
        console.info("Successfully updated todo!");
      } catch (err) {
        console.log(`${JSON.stringify(err)}`);
      }
    } else {
      todoMap.set(todo.id, todo);

      if (tab === "todo") {
        setTodoList(
          [...todoMap]
            .map(([key, value]) => value)
            .filter((todo) => !todo.completed)
        );
      } else if (tab === "completed") {
        setTodoList(
          [...todoMap]
            .map(([key, value]) => value)
            .filter((todo) => todo.completed)
        );
      } else {
        listTodos();
      }
    }
  };

  const onDeleteTodos = async (idList) => {
    if (session) {
      try {
        await API.graphql({
          query: mutations.batchDelete,
          variables: { ids: idList },
        });

        let idSet = new Set(idList);
        // updating todo state
        const filterTodo = todoList.filter((todo) => !idSet.has(todo.id));

        let sortedList = sortTodoList(filterTodo);
        setTodoList(sortedList);

        console.info("Successfully deleted todos!");
      } catch (err) {
        console.log(`${JSON.stringify(err)}`);
      }
    } else {
      for (const id of idList) {
        todoMap.delete(id);
      }

      if (tab === "todo") {
        setTodoList(
          [...todoMap]
            .map(([key, value]) => value)
            .filter((todo) => !todo.completed)
        );
      } else if (tab === "completed") {
        setTodoList(
          [...todoMap]
            .map(([key, value]) => value)
            .filter((todo) => todo.completed)
        );
      } else {
        listTodos();
      }
    }
  };

  const onFilterTodos = async (tag) => {
    if (tab === tag) return;

    setTab(tag);

    if (session) {
      let filter = {
        user: { eq: session.user.email },
      };

      // filtering 'completed' status
      if (tag === "todo") {
        filter.completed = { eq: false };
      } else if (tag === "completed") {
        filter.completed = { eq: true };
      }

      try {
        const todoData = await API.graphql({
          query: queries.listTodos,
          variables: { filter: filter },
        });

        setTodoList(todoData.data.listTodos.items);

        console.info("successfully filtered todos!");
      } catch (err) {
        console.log(`${JSON.stringify(err)}`);
      }
    } else {
      if (tag === "todo") {
        setTodoList(
          [...todoMap]
            .map(([key, value]) => value)
            .filter((todo) => !todo.completed)
        );
      } else if (tag === "completed") {
        setTodoList(
          [...todoMap]
            .map(([key, value]) => value)
            .filter((todo) => todo.completed)
        );
      } else {
        listTodos();
      }
    }
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
