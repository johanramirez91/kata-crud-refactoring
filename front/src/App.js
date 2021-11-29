import React from "react";
import { StoreProvider } from "./components/Store";
import { Form } from "./components/Form";
import { List } from "./components/List";

function App() {
  return (
    <StoreProvider>
      <div className="container border border-info">
        <h3>To-Do List</h3>
        <hr />
        <Form />
        <List />
      </div>
    </StoreProvider>)
}

export default App;
