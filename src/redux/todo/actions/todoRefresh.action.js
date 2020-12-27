import TodoActionTypes from "../todo.types";

const todoRefreshRequest = () => ({
  type: TodoActionTypes.TODO_REFRESH_REQUEST
});
const todoRefreshDone = (payload) => ({
  type: TodoActionTypes.TODO_REFRESH_DONE,
  payload
});
export const todoRefresh = () => {
  return (dispatch) => {
    dispatch(todoRefreshRequest());
    return fetch("http://localhost:3050/tasks")
      .then((res) => res.json())
      .then((tasks) => dispatch(todoRefreshDone(tasks)));
  };
};
