/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onBatchDelete = /* GraphQL */ `
  subscription OnBatchDelete($user: String) {
    onBatchDelete(user: $user) {
      id
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      title
      completed
      categories
      user
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      title
      completed
      categories
      user
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      title
      completed
      categories
      user
      createdAt
      updatedAt
    }
  }
`;
