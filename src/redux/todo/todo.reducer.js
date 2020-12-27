import { createReducer } from "@reduxjs/toolkit";
import TodoActionTypes from "./todo.types";

const initialState = [];

const todoReducer = createReducer(initialState, (builder) => {
  builder.addCase(TodoActionTypes.TODO_REFRESH_REQUEST, (state, action) => {
    return state;
  });
  builder.addCase(TodoActionTypes.TODO_REFRESH_DONE, (state, action) => {
    return action.payload;
  });
  builder.addCase(TodoActionTypes.TODO_INSERT_REQUEST, (state, action) => {
    return state;
  });
  builder.addCase(TodoActionTypes.TODO_DELETE_REQUEST, (state, action) => {
    return state;
  });
  builder.addCase(TodoActionTypes.TOGGLE_TODO, (state, action) => {
    return state;
  });
  builder.addCase(TodoActionTypes.EDIT_TODO, (state, action) => {
    state
      .filter((item) => item.id === action.payload)
      .map((item) => (item.edit = !item.edit));
  });
  builder.addCase(TodoActionTypes.SAVE_EDIT_TODO, (state, action) => {
    return state;
  });
  builder.addCase(TodoActionTypes.UPDATE_QUANTITY_TODO, (state, action) => {
    return state;
  });
});

export default todoReducer;
