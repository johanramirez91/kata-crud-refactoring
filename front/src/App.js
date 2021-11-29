import React from "react";
import { StoreProvider } from "./Store";
import ListForm from "./List/List";
import Form from "./List/Form";

function App() {
  return (
    <StoreProvider>
      <div className="position-relative">
        <div class="position-absolute top-0 start-50 translate-middle-x">
          <h3>To-Do</h3>
          <hr />
        </div>
        <div className="container-fluid p-3">
          <Form />
          <ListForm />
        </div>
      </div>
    </StoreProvider>)
}

export default App;
