import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import Todo from "./pages/Todo/Todo";
const App = () => (
  <Provider store={store}>
    <div className="App">
      <Todo />
    </div>
  </Provider>
);

export default App;
