import React from "react";
import { connect } from "react-redux";

import { addTodo, toggleTodo, deleteTodo } from "../../redux/todo/todo.action";

import * as styles from "./Todo.styles";

const Todo = ({ tasks, addTodo, toggleTodo, deleteTodo }) => {
  let input;

  return (
    <styles.Todo>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(input.value);
          input.value = "";
        }}
      >
        <p>
          <input type="text" ref={(node) => (input = node)} />
          <button type="submit">Add</button>
        </p>
      </form>
      <div>
        <table cellSpacing="0">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
              <th colSpan="2">Action</th>
            </tr>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => toggleTodo(task.id)}
                  />
                </td>
                <td>
                  {task.edit ? (
                    <a href="/#">Edit</a>
                  ) : (
                    <div>
                      <a href="/#">Save</a>/<a href="/#">Cancel</a>
                    </div>
                  )}
                </td>
                <td>
                  <a href="/#" onClick={() => deleteTodo(task.id)}>
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </styles.Todo>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.todo
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (e) => dispatch(addTodo(e)),
  toggleTodo: (id) => dispatch(toggleTodo(id)),
  deleteTodo: (id) => dispatch(deleteTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
