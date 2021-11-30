import React, { useContext, useEffect } from "react";
import { Store } from '../Store';
import api from "../utils/API";

const ListTodo = (props) => {
    const { group } = props;
    const { dispatch, state: { todo } } = useContext(Store);
    var currentList = todo.list.filter(todo => todo.groupListId === group);

    useEffect(() => {
        api.todo.all()
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list", list })
            })
    }, [dispatch]);

    const onDelete = (id) => {
        api.todo.delete(id).then(() => {
            dispatch({ type: "delete-item", id })
        })
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    const onChange = async (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked,
            groupListId: group
        };

        try {
            const todo = await api.todo.edit(request);
            dispatch({ type: "update-item", item: todo });

        } catch (error) {
            console.log(error)
        }
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };

    return <>
        <table className="table table-hover table-info" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tarea</th>
                    <th>¿Completado?</th>
                </tr>
            </thead>
            <tbody>
                {currentList.map((todo) => {
                    return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td>
                            <input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}>
                            </input>
                        </td>
                        <td>
                            <button className="btn btn-danger ml-2" onClick={() => onDelete(todo.id)}>
                                Eliminar
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-warning ml-2" onClick={() => onEdit(todo)}>
                                Editar
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
}
export default ListTodo;