import React, { useEffect } from "react";
import { Space, Divider } from "antd";
import { Form, Checkbox, InputNumber } from "antd";
import { Table } from "antd";

import { connect } from "react-redux";

import * as todo from "../../redux/todo/todo.action";

import TodoRow from "../todoRow/TodoRow.component";

const TodoTable = ({
  tasks,
  toggleTodo,
  saveEditTodo,
  editTodo,
  deleteTodo,
  updateQuantityTodo,
  todoRefresh
}) => {
  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text) => {
        return text;
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return (
          <Checkbox
            onChange={() => toggleTodo(record.id)}
            defaultChecked={text}
          />
        );
      }
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <InputNumber
            style={{ width: "50px" }}
            min={1}
            defaultValue={text}
            onChange={(value) => {
              updateQuantityTodo(record.id, value);
            }}
          />
        );
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.edit ? (
            <Form
              name="basic"
              initialValues={{
                remember: false
              }}
              onFinish={(values) => {
                saveEditTodo(record.id, values.task);
                editTodo(record.id);
              }}
            >
              <TodoRow id={record.id} editTodo={editTodo} />
            </Form>
          ) : (
            <>
              <a href="/#" onClick={() => editTodo(record.id)}>
                Edit
              </a>
              <a href="/#" onClick={() => deleteTodo(record.id)}>
                Delete
              </a>
            </>
          )}
        </Space>
      )
    }
  ];

  const finishedTasks = tasks.filter((task) => task.status === true);
  const unfinishedTasks = tasks.filter((task) => task.status === false);

  useEffect(() => {
    async function fetchMyAPI() {
      todoRefresh();
    }

    fetchMyAPI();
  }, [todoRefresh]);

  return (
    <>
      {unfinishedTasks.length > 0 && (
        <>
          <Divider>Tasks</Divider>
          <Table
            columns={columns}
            dataSource={unfinishedTasks}
            rowKey="id"
            pagination={false}
          />
        </>
      )}
      {finishedTasks.length > 0 && (
        <>
          <Divider>Completed Tasks</Divider>
          <Table
            columns={columns}
            dataSource={finishedTasks}
            rowKey="id"
            pagination={false}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.todo
});

const mapDispatchToProps = (dispatch) => ({
  todoRefresh: () => dispatch(todo.todoRefresh()),
  toggleTodo: (id) => dispatch(todo.toggleTodo(id)),
  deleteTodo: (id) => dispatch(todo.deleteTodo(id)),
  editTodo: (id) => dispatch(todo.editTodo(id)),
  saveEditTodo: (id, text) => dispatch(todo.saveEditTodo(id, text)),
  updateQuantityTodo: (id, quantity) =>
    dispatch(todo.updateQuantityTodo(id, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
