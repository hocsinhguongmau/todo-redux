import React from "react";

import { Layout } from "antd";

import AddTodoComponent from "../../components/addTodo/AddTodo.component";
import TodoTable from "../../components/todoTable/TodoTable.component";

const { Content } = Layout;

const layoutStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "20px"
};

const Todo = () => {
  return (
    <Layout style={layoutStyle}>
      <Content>
        <AddTodoComponent />
        <TodoTable />
      </Content>
    </Layout>
  );
};

export default Todo;
