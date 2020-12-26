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

  builder.addCase(TodoActionTypes.TOGGLE_TODO, (state, action) => {
    state[action.payload - 1].status = !state[action.payload - 1].status;
  });
  builder.addCase(TodoActionTypes.DELETE_TODO, (state, action) => {
    return action.payload;
  });
  builder.addCase(TodoActionTypes.EDIT_TODO, (state, action) => {
    state[action.payload - 1].edit = !state[action.payload - 1].edit;
  });
  builder.addCase(TodoActionTypes.SAVE_EDIT_TODO, (state, action) => {
    state[action.payload.id - 1].task = action.payload.text;
  });
  builder.addCase(TodoActionTypes.UPDATE_QUANTITY_TODO, (state, action) => {
    state[action.payload.id - 1].quantity = action.payload.quantity;
  });
});

export default todoReducer;
