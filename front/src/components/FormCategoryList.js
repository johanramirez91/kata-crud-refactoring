import React, { useContext, useEffect } from 'react';
import { Form } from './Form';
import { HOST_API } from "../utils/HOST_API";
import { Store } from "./Store";
import { List } from './List';

const FormCategoryList = () => {
    const { dispatch, state: { categoryList } } = useContext(Store);
    const lista = categoryList.list;

    useEffect(() => {
        fetch(HOST_API + "/categories")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "add-category", list: list });
            });
    }, [dispatch]);

    return (
        lista.map((category) => {
            return (
                <div key={category.id_category}>
                    <h2>{category.name}</h2>
                    <button className="btn btn-danger">Eliminar</button>
                    <Form id={category.id_category} />
                    <List id={category.id_category} listCategory={category.todos} />
                </div>
            )
        })
    )
};

export default FormCategoryList;