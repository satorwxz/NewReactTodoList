import React from 'react';

const TodoItem = ({ todo, handleDone, handleEdit, handleDelete }) => {
    return (
        <div className={`mb-3`}>
            <div className={' d-flex justify-content-between align-items-center'}>
                <div>
                    <h4 style={{ width: '250px' }}>{todo.title}</h4>
                    <small>Created At: {new Date(todo.createdAt).toLocaleString()}</small>
                </div>
                <input disabled={todo.isDone} type="checkbox" checked={todo.required} />
                {todo.asset && <img src={todo.asset} alt="asset" style={{ width: '50px' }} />}
                <button
                    onClick={() => handleEdit(todo)}
                    className={"btn btn-primary"}
                    disabled={todo.isDone}>
                    Edit
                </button>
                <button
                    onClick={() => handleDone(todo)}
                    className={"btn btn-success"}
                    disabled={todo.isDone}>
                    Done
                </button>
                <button
                    onClick={() => handleDelete(todo)}
                    className={"btn btn-danger"}
                    disabled={todo.isDone}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
