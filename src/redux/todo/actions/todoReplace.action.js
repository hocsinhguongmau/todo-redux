import TodoActionTypes from "../todo.types";
import { todoRefresh } from "./todoRefresh.action";

const todoReplaceRequest = (item) => ({
  type: TodoActionTypes.TODO_EDIT_REQUEST,
  payload: item
});

export const todoReplace = (todo, task) => {
  return (dispatch) => {
    dispatch(todoReplaceRequest());
    return fetch("http://localhost:3050/tasks/" + encodeURIComponent(todo.id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: todo.id,
        task: task,
        quantity: todo.quantity,
        status: todo.status,
        edit: !todo.edit
      })
    }).then(() => dispatch(todoRefresh()));
  };
};
