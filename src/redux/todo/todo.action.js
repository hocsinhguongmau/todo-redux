import { createAction } from "@reduxjs/toolkit";
import TodoActionTypes from "./todo.types";

export const addTodo = createAction(TodoActionTypes.ADD_TODO, function prepare(
  text
) {
  return {
    payload: text
  };
});

export const toggleTodo = createAction(
  TodoActionTypes.TOGGLE_TODO,
  function prepare(id) {
    return {
      payload: id
    };
  }
);

export const deleteTodo = createAction(
  TodoActionTypes.DELETE_TODO,
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
