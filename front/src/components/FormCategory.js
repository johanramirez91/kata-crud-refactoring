import React, { useContext, useRef, useState } from 'react';
import { HOST_API } from '../utils/HOST_API';
import { Store } from "./Store";

const FormCategory = () => {
    const formRef = useRef(null);
    const { dispatch, state: { categoryList } } = useContext(Store);
    const item = categoryList.item;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id_category: null
        };

        fetch(HOST_API + "/category", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((categoryList) => {
                dispatch({ type: "add-item", item: categoryList });
                setState({ name: "" });
                formRef.current.reset();
            });
    };

    return (
        <div>
            <form ref={formRef}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ingresa una Categoria"
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value });
                    }}>
                </input>
                <button onClick={onAdd}>Nueva Categoria</button>
            </form>
        </div>
    )
};

export default FormCategory;