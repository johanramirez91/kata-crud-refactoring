import React from "react";
import Form from "./components/Form";
import List from "./components/List";
import StoreProviver from "./components/Store";

function App() {
  return (
    <StoreProviver>
      <div className="position-relative">
        <div className="position-absolute top-0 start-50 translate-middle-x">
          <h3>To-Do list</h3>
          <hr />
          <br />
          <Form />
          <List />
        </div>
      </div>
    </StoreProviver>)
}

export default App;
