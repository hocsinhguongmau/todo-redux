import TodoActionTypes from "../todo.types";
import { todoRefresh } from "./todoRefresh.action";

const todoToggleRequest = (item) => ({
  type: TodoActionTypes.TODO_TOGGLE_REQUEST,
  payload: item
});

export const todoToggle = (todo) => {
  return (dispatch) => {
    dispatch(todoToggleRequest());
    return fetch("http://localhost:3050/tasks/" + encodeURIComponent(todo.id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: todo.id,
        task: todo.task,
        quantity: todo.quantity,
        status: !todo.status,
        edit: todo.edit
      })
    }).then(() => dispatch(todoRefresh()));
  };
};
