import { createAction } from "@reduxjs/toolkit";
import TodoActionTypes from "./todo.types";

export const editTodo = createAction(
  TodoActionTypes.EDIT_TODO,
  function prepare(id) {
    return {
      payload: id
    };
  }
);
