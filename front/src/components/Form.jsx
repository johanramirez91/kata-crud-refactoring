import React, { useContext, useRef, useState } from 'react'
import { Store } from './Store';
const HOST_API = "http://localhost:8080/api";

const Form = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
            completed: false
        };

        if (state.name !== undefined) {
            fetch(HOST_API + "/todo", {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((todo) => {
                    dispatch({ type: "add-item", item: todo });
                    setState({ name: "" });
                    formRef.current.reset();
                });
        }
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            completed: item.isCompleted
        };

        if (state.name !== undefined) {
            fetch(HOST_API + "/todo", {
                method: "PUT",
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((todo) => {
                    dispatch({ type: "update-item", item: todo });
                    setState({ name: "" });
                    formRef.current.reset();
                });
        }
    }


    return (
        <>
            <Form ref={formRef}>
                <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="¿Qué harás hoy?"
                    defaultValue={item.name}
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }}
                />
                {item.id && <button className="btn btn-info" onClick={onEdit}>Editar</button>}
                {!item.id && <button className="btn btn-primary" onClick={onAdd}>Nueva</button>}
            </Form>
        </>
    )
}

export default Form;
