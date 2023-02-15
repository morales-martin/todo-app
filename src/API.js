import { Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports";

import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

Amplify.configure(awsconfig);

export const listTodos = async (filter) => {
  try {
    const todoData = await API.graphql({
      query: queries.listTodos,
      variables: { filter: filter },
    });

    return todoData.data.listTodos.items;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

export const createTodo = async (todo) => {
  try {
    await API.graphql({
      query: mutations.createTodo,
      variables: { input: { ...todo } },
    });
  } catch (err) {
    console.error(err.errors);
  }
};

export const updateTodo = async (todo) => {
  try {
    await API.graphql({
      query: mutations.updateTodo,
      variables: {
        input: { ...todo },
      },
    });
  } catch (err) {
    console.error(err.errors);
  }
};

export const deleteTodos = async (todoIDList) => {
  try {
    await API.graphql({
      query: mutations.batchDelete,
      variables: { ids: todoIDList },
    });
  } catch (err) {
    console.error(err.errors);
  }
};
