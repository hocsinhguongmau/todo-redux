import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import Todo from "./pages/Todo/Todo";

fetch("http://localhost:3050/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    task: "AAAA",
    quantity: 1,
    status: true,
    edit: false
  })
})
  .then((res) => res.json())
  .then((tasks) => console.log(tasks));
const App = () => (
  <Provider store={store}>
    <div className="App">
      <Todo />
    </div>
  </Provider>
);

export default App;
