import { createReducer } from "@reduxjs/toolkit";
import TodoActionTypes from "./todo.types";

const initialState = [
  { id: 1, title: "Eat", status: true, edit: false },
  { id: 2, title: "Sleep", status: false, edit: true }
];

const todoReducer = createReducer(initialState, (builder) => {
  builder.addCase(TodoActionTypes.ADD_TODO, (state, action) => {
    let count = state.length;
    state.push({
      id: count + 1,
      title: action.payload,
      status: false,
      edit: false
    });
  });
  builder.addCase(TodoActionTypes.TOGGLE_TODO, (state, action) => {
    state[action.payload - 1].status = !state[action.payload - 1].status;
  });
  builder.addCase(TodoActionTypes.DELETE_TODO, (state, action) => {
    delete state[action.payload - 1];
  });
});

export default todoReducer;
