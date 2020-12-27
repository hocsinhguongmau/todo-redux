import TodoActionTypes from "../todo.types";
import uuid from "react-uuid";
import { todoRefresh } from "./todoRefresh.action";

const todoInsertRequest = () => ({
  type: TodoActionTypes.TODO_INSERT_REQUEST
});
export const todoInsert = (todo) => {
  return (dispatch) => {
    dispatch(todoInsertRequest());
    return fetch("http://localhost:3050/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: uuid(),
        task: todo,
        quantity: 1,
        status: false,
        edit: false
      })
    })
      .then((res) => res.json())
      .then(() => dispatch(todoRefresh()));
  };
};
