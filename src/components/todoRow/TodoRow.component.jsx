import React from "react";
import { Row, Col } from "antd";
import { Form, Input, Button } from "antd";

const TodoRow = (props) => {
  return (
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
          <Button type="primary" onClick={() => props.editTodo(props.id)}>
            Cancel
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default TodoRow;
