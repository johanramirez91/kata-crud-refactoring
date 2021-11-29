import React, { useContext, useState, useEffect } from 'react'
import Store from '../Store';
import peticiones from './Petitions';
import events from './Events';

export default function List() {

    const { dispatch, todo, listId } = useContext(Store);
    const currentList = todo.data.filter((element) => {
        return element.listId === listId;
    })

    useEffect(() => {
        peticiones.find(listId).then((response) => {
            response.json().then((items) => {
                dispatch(events.finded(listId, items))
            })
        })
    }, [listId, dispatch])

    const onEdit = (element) => {
        dispatch(events.onEdited(element))
    };

    const onDelete = (element) => {
        peticiones.delete(element).then((response) => {
            dispatch(events.deleted(listId, element))
        })
    }

    const onChange = (event, item) => {
        const request = {
            name: item.name,
            id: item.id,
            completed: event.target.checked
        };

        peticiones.update(listId, request).then((response) => {
            response.json().then(() => {
                dispatch(events.updated(listId, request))
            })
        })
    }

    const decorationDone = {
        textDecoration: 'line-through'
    };

    return (
        <>
            <table className="table table-info table-hover mt-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tarea</th>
                        <th scope="col">¿Completado?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentList.map((todo) => {
                            return (
                                <tr key={todo.id} style={todo.completed ? decorationDone : {}} id={"to-do-" + todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.name}</td>
                                    <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                                    <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                                    <td><button disabled={todo.completed} onClick={() => onEdit(todo)}>Editar</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

