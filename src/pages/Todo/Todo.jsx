import React from "react";

import { Row, Col, Layout, Space } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import { Table } from "antd";

import { connect } from "react-redux";

import * as todo from "../../redux/todo/todo.action";

const { Content } = Layout;

const layoutStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "20px"
};

const Todo = ({
  tasks,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  saveEditTodo
}) => {
  const [form] = Form.useForm();
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
              <Row>
                <Col span={12}>
                  <Form.Item
                    label=""
                    name="task"
                    rules={[
                      {
                        required: true,
                        message: "Please input your item!"
                      }
                    ]}
                    style={{ marginBottom: "0px" }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item style={{ marginBottom: "0px" }}>
                    <Button type="primary" htmlType="submit">
                      Change
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item style={{ marginBottom: "0px" }}>
                    <Button type="primary" onClick={() => editTodo(record.id)}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
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

  const onFinish = (values) => {
    addTodo(values.task);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout style={layoutStyle}>
      <Content>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: false
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col span={20}>
              <Form.Item
                label=""
                name="task"
                rules={[
                  {
                    required: true,
                    message: "Please input your item!"
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          pagination={false}
        />
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.todo
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (e) => dispatch(todo.addTodo(e)),
  toggleTodo: (id) => dispatch(todo.toggleTodo(id)),
  deleteTodo: (id) => dispatch(todo.deleteTodo(id)),
  editTodo: (id) => dispatch(todo.editTodo(id)),
  saveEditTodo: (id, text) => dispatch(todo.saveEditTodo(id, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
