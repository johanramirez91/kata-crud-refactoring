import React, { useState, useContext, useEffect } from 'react';
import List from '../Todo/List';
import Form from '../Todo/Form';
import peticiones from './Peticiones';
import events from './Events';
import Store from '../Store';


export default function ListForm() {

    const { state: { list, todo }, dispatch } = useContext(Store);
    useEffect(() => {
        peticiones.find().then((response) => {
            response.json().then((list) => {
                dispatch(events.finded(list));
            })
        })
    }, [dispatch]);

    const onDelete = (listId) => {
        peticiones.delete(listId).then((response) => {
            dispatch(events.deleted(listId));
        })
    }

    return (
        <>
            {list.data.length === 0 && <label className="form-label">Sin elementos</label>}
            {list.data.map((element) => {
                return <div key={element.id} id={"list-to-do" + element.id}>
                    <section>
                        <label>
                            {element.name.toUpperCase()}
                            <button className="btn btn-danger" onClick={() => onDelete(element.id)}>Eliminar</button>
                        </label>
                        <Form listId={element.id} todo={todo} />
                        <List listId={element.id} todo={todo} />
                    </section>
                </div>
            })}
        </>
    )

}