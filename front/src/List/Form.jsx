import React, { useContext, useRef, useState } from 'react';
import peticiones from './Peticiones';
import events from './Events';
import Store from '../Store';

const Form = () => {

    const { dispatch } = useContext(Store);
    const formRef = useRef(null);
    const [state, setState] = useState({ name: "" });

    const onCreate = (event) => {
        event.preventDefault();
        peticiones.save({ name: state.name, id: null }).then((response) => {
            response.json().then((list) => {
                dispatch(events.saved(list));
                formRef.current.reset();
                setState({ name: "" })
            })
        })
    }

    return (
        <>
            <form className="mt-5" ref={formRef}>
                <input className="form-control mb-2"
                    type="text"
                    name="name"
                    placeholder="Nombre de la lista"
                    onChange={(event) => {
                        setState({ name: event.target.value })
                    }}
                />
                <button className="btn btn-primary" onClick={onCreate}>Crear Lista</button>
            </form>

        </>
    )
}

export default Form
