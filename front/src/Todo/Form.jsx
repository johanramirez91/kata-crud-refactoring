import React, { useRef, useContext, useState } from 'react'
import Store from '../Store';
import peticiones from './Petitions';
import events from './Events';

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

        peticiones.save(item).then((response) => {
            response.json().then((result) => {
                dispatch(events.saved(result));
                setState({ name: "" })
                formRef.current.reset();
            })
        })
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            completed: item.completed
        };

        peticiones.update(item).then((response) => {
            response.json().then((result) => {
                dispatch(events.updated(result));
                setState({ name: "" })
                formRef.current.reset();
            })
        })
    }

    return (
        <>
            <form ref={formRef}>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="¿Qué piensas hacer hoy?"
                    defaultValue={item.name}
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }}
                />
                {item.id && <button onClick={onEdit}>Actualizar</button>}
                {!item.id && <button onClick={onAdd}>Crear</button>}
            </form>
        </>
    )
}

export default Form
