import { createAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import TodoActionTypes from "./todo.types";
import { todoRefresh } from "./actions/todoRefresh.action";

export const addTodo = createAction(
  TodoActionTypes.ADD_TODO,
  function prepare(text) {
    return {
      payload: text
    };
  }
);

export const toggleTodo = createAction(
  TodoActionTypes.TOGGLE_TODO,
  function prepare(id) {
    return {
      payload: id
    };
  }
);

export const editTodo = createAction(
  TodoActionTypes.EDIT_TODO,
  function prepare(id) {
    return {
      payload: id
    };
  }
);

export const saveEditTodo = createAction(
  TodoActionTypes.SAVE_EDIT_TODO,
  function prepare(id, text) {
    return {
      payload: { id, text }
    };
  }
);

export const updateQuantityTodo = createAction(
  TodoActionTypes.UPDATE_QUANTITY_TODO,
  function prepare(id, quantity) {
    return {
      payload: { id, quantity }
    };
  }
);

const todoInsertRequest = () => ({
  type: TodoActionTypes.TODO_INSERT_REQUEST
});
export const insertTodo = (todo) => {
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
