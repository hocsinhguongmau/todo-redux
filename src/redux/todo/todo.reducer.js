import { createReducer } from "@reduxjs/toolkit";
import TodoActionTypes from "./todo.types";

const initialState = [
  { id: 1, task: "Eat", status: true, edit: false },
  { id: 2, task: "Sleep", status: false, edit: false }
];

const todoReducer = createReducer(initialState, (builder) => {
  builder.addCase(TodoActionTypes.ADD_TODO, (state, action) => {
    let count = state.length;
    state.push({
      id: count + 1,
      task: action.payload,
      status: false,
      edit: false
    });
  });
  builder.addCase(TodoActionTypes.TOGGLE_TODO, (state, action) => {
    state[action.payload - 1].status = !state[action.payload - 1].status;
  });
  builder.addCase(TodoActionTypes.DELETE_TODO, (state, action) => {
    return state.filter((item) => item.id !== action.payload);
  });
  builder.addCase(TodoActionTypes.EDIT_TODO, (state, action) => {
    state[action.payload - 1].edit = !state[action.payload - 1].edit;
  });
  builder.addCase(TodoActionTypes.SAVE_EDIT_TODO, (state, action) => {
    state[action.payload.id - 1].task = action.payload.text;
  });
});

export default todoReducer;
