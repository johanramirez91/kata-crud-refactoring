import React, { useContext, useRef, useState } from 'react';
import { Store } from '../Store';
import api from '../utils/API';

export default function Form(props) {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
    const { group } = props;


    const onAdd = async (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
            completed: false,
            groupListId: group
        };

        try {
            const todo = await api.todo.add(request);
            dispatch({ type: "add-item", item: todo });
            setState({ name: "" });
            formRef.current.reset();

        } catch (error) {
            console.log(error)
        }
    }

    const onEdit = async (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            isCompleted: item.isCompleted,
            groupListId: group
        };

        console.log(request);

        try {
            const todo = await api.todo.edit(request);
            dispatch({ type: "update-item", item: todo });
            setState({ name: "" });
            formRef.current.reset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form ref={formRef} className="container">
            <div className="row p-3">
                <input
                    className="form-control col-10 p-2"
                    type="text"
                    name="name"
                    placeholder="¿Alguna actividad?"
                    defaultValue={item.groupListId === group ? item.name : ''}
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }} ></input>
                {item.id && item.groupListId === group &&
                    <button className="btn btn-warning col-2" onClick={onEdit}>
                        Actualizar tarea
                    </button>
                }
                {item.id && item.groupListId !== group &&
                    <button className="btn btn-success col-2 mt-2" onClick={onAdd}>
                        Crear tarea
                    </button>
                }
                {!item.id && <button className="btn btn-success col-2 mt-2" onClick={onAdd}>
                    Crear tarea
                </button>
                }
            </div>
        </form>
    );
}