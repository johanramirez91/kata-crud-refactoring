import React, { useContext, useEffect } from 'react';
import { Store } from '../Store';
import Form from './Form';
import ListTodo from './ListTodo';
import api from '../utils/API';

export default function ListGroup() {
    const { dispatch, state: { groupList } } = useContext(Store);
    const currentGroupList = groupList.list;

    useEffect(() => {
        api.groupList.all()
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: "update-list-group", list })
            })
    }, [dispatch]);

    const onDelete = (id) => {
        api.groupList.deleteGroupList(id).then(() => {
            dispatch({ type: "delete-item-group", id })
        })
    };

    return (
        <div>
            {currentGroupList.map((groupList) => {
                return (
                    <div key={groupList.id} className="border border-succes">
                        <div>
                            <h2>{groupList.name}</h2>
                            <button className="btn btn-danger ml-3 mt-2 mb-3" onClick={() => onDelete(groupList.id)}>
                                Eliminar tarea
                            </button>
                            <Form group={groupList.name} />
                            <ListTodo group={groupList.name} />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}