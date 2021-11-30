import React from "react";
import FormList from "./components/FormList";
import ListGroup from "./components/ListGroup";
import StoreProvider from "./Store";


function App() {
  return (
    <StoreProvider>
      <div className="container border border-info p-3 text-center">
        <h3>To-Do List</h3>
        <hr />
        <FormList />
        <ListGroup />
      </div>
    </StoreProvider>)
}

export default App;
