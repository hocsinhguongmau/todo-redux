import React from "react";
import { Space } from "antd";
import { Form, Checkbox } from "antd";
import { Table } from "antd";

import { connect } from "react-redux";

import * as todo from "../../redux/todo/todo.action";

import TodoRow from "../todoRow/TodoRow.component";

const TodoTable = ({
  tasks,
  toggleTodo,
  saveEditTodo,
  editTodo,
  deleteTodo
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
              <TodoRow record={record} editTodo={editTodo} />
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
  return (
    <>
      {tasks.length > 0 && (
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          pagination={false}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.todo
});

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(todo.toggleTodo(id)),
  deleteTodo: (id) => dispatch(todo.deleteTodo(id)),
  editTodo: (id) => dispatch(todo.editTodo(id)),
  saveEditTodo: (id, text) => dispatch(todo.saveEditTodo(id, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
