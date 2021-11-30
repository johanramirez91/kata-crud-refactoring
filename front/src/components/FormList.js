import React, { useContext, useRef, useState } from 'react';
import { Store } from '../Store';
import api from '../utils/API';

const FormList = () => {
    const formRef = useRef(null);
    const { dispatch, state: { groupList } } = useContext(Store);
    const item = groupList.item;
    const [state, setState] = useState(item);

    const onAdd = async (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null
        };

        try {
            const groupList = await api.groupList.addGroupList(request);
            dispatch({ type: "add-item-group", item: groupList });
            formRef.current.reset();
            setState({ name: "" });
        } catch (error) {
            console.log(error);
        }
    }

    const onEdit = async (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            isCompleted: item.isCompleted
        };

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
            <div className="row">
                <input
                    className="form-control col-10"
                    type="text"
                    name="name"
                    placeholder="¿Qué harás hoy?"
                    defaultValue={item.name}
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }} ></input>
                {item.id && <button onClick={onEdit}>Actualizar</button>}
                {!item.id &&
                    <button className="btn btn-primary mt-3 mb-3" onClick={onAdd}>
                        Nueva tarea
                    </button>}
            </div>
        </form>
    );
}

export default FormList;