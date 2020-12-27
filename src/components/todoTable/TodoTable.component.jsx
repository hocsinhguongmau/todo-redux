import React, { useEffect, useState } from "react";
import { Space, Divider } from "antd";
import { Form, Checkbox, InputNumber } from "antd";
import { Table, Spin } from "antd";

import { connect } from "react-redux";

import * as todo from "../../redux/todo/todo.action";
import { todoRefresh } from "../../redux/todo/actions/todoRefresh.action";
import { todoDelete } from "../../redux/todo/actions/todoDelete.action";
import { todoToggle } from "../../redux/todo/actions/todoToggle.action";
import { todoUpdateQuantity } from "../../redux/todo/actions/todoUpdateQuantity.action";
import { todoReplace } from "../../redux/todo/actions/todoReplace.action";

import TodoRow from "../todoRow/TodoRow.component";
const TodoTable = ({
  tasks,
  toggleTodo,
  todoReplace,
  editTodo,
  todoDelete,
  todoUpdateQuantity,
  todoRefresh
}) => {
  const [loading, setLoading] = useState(true);
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
          <Checkbox onChange={() => toggleTodo(record)} defaultChecked={text} />
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
              todoUpdateQuantity(record, value);
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
                todoReplace(record, values.task);
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
              <a href="/#" onClick={() => todoDelete(record.id)}>
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
    setLoading(false);
  }, [todoRefresh]);

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px 10px" }}>
          <Spin />
        </div>
      ) : (
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
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.todo
});

const mapDispatchToProps = (dispatch) => ({
  todoRefresh: () => dispatch(todoRefresh()),
  toggleTodo: (item) => dispatch(todoToggle(item)),
  todoDelete: (id) => dispatch(todoDelete(id)),
  editTodo: (id) => dispatch(todo.editTodo(id)),
  todoReplace: (id, text) => dispatch(todoReplace(id, text)),
  todoUpdateQuantity: (item, quantity) =>
    dispatch(todoUpdateQuantity(item, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
