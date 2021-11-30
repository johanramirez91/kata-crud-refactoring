import React, { useContext, useEffect } from 'react';
import { HOST_API } from "../utils/API";
import { Store } from '../Store';

export const List = () => {
    const { dispatch, state: { todo, list } } = useContext(Store);
    const currentList = todo.list;

    useEffect(() => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list });
            });
    }, [dispatch]);


    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id });
        });
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo });
    };

    const onChange = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked
        };

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
            });
    };

    const isCompleted = (completed) => {
        return completed ? true : false;
    }

    const decorationDone = {
        textDecoration: 'line-through'
    };

    return <table className="table table-striped table-hover">
        <thead className="table-dark">
            <tr>
                <td >ID</td>
                <td>Tarea</td>
                <td>¿Completado?</td>
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            {list.length === 0 && <div>Lista vacia!</div>}
            {currentList.map((todo) => {
                return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                    <td>{todo.id}</td>
                    <td>{todo.name}</td>
                    <td >
                        <input className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            defaultChecked={todo.completed}
                            onChange={(event) => onChange(event, todo)}>
                        </input>
                    </td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="button" className="btn btn-danger"
                            onClick={() => onDelete(todo.id)}>Eliminar</button>
                        <button disabled={isCompleted(todo.completed)}
                            type="button" className="btn btn-warning"
                            onClick={() => onEdit(todo)}>Editar</button>
                    </div>
                </tr>;
            })}
        </tbody>
    </table>
};