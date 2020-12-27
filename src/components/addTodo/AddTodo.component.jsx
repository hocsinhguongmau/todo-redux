import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { Form, Input, Button } from "antd";
import * as todo from "../../redux/todo/todo.action";

const AddTodoComponent = ({ addTodo }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    addTodo(values.task);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{
        remember: false
      }}
      onFinish={onFinish}
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
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTodo: (e) => {
    dispatch(todo.insertTodo(e));
  }
});

export default connect(null, mapDispatchToProps)(AddTodoComponent);
