import Head from "next/head";
import React, { useState } from "react";

import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todos";

import { Amplify, API } from "aws-amplify";
import awsconfig from "../aws-exports";

import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

Amplify.configure(awsconfig);

/*

Using Amplify's automatically generated query listTodos imported from the ../src/graphql/queries 
directory to get a list of all the Todos from the backend API, which is then passed as props to the main component.

*/
export async function getStaticProps() {
  const todoData = await API.graphql({
    query: queries.listTodos,
  });

  return {
    props: {
      todos: todoData.data.listTodos.items,
    },
  };
}

export default function Home({ todos }) {
  const [todoList, setTodoList] = useState(todos);

  /*

  Here, the onCreateTodo function receives an 
  input of an object with title and completed values. 
  Also, this function is passed to the CreateTodo component as a prop

  */
  const onCreateTodo = async (todo) => {
    // instantiate todo object from input
    const newTodo = {
      title: todo,
      completed: false,
    };

    // add todo to backend via api
    try {
      let newTodoData = await API.graphql({
        query: mutations.createTodo,
        variables: { input: newTodo },
      });

      newTodo.id = newTodoData.data.createTodo.id;

      // update todo state
      setTodoList((list) => [...list, { ...newTodo }]);

      console.log("Successfully create a todo!");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const onDeleteTodo = async (id) => {
    // delete todo from backend
    try {
      await API.graphql({
        query: mutations.deleteTodo,
        variables: { input: { id } },
      });

      // updating todo state
      const filterTodo = todoList.filter((todo) => todo.id !== id);
      setTodoList(filterTodo);

      console.log("Successfully deleted a todo!");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CreateTodo onCreateTodo={onCreateTodo}></CreateTodo>
        <Todo todoList={todoList} onDeleteTodo={onDeleteTodo} />
      </main>
    </>
  );
}
