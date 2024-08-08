import React, { useEffect, useState } from 'react';
import TodoItem from "./Components/TodoItem";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: '',
    required: false,
    isDone: false,
    asset: '',
    createdAt: new Date().toISOString()
  });
  const [isAsset, setIsAsset] = useState(false);

  useEffect(() => {
    axios('https://66b1a2c81ca8ad33d4f4a046.mockapi.io/todo')
        .then(({ data }) => setTodos(data));

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.id) {
      axios.put(`https://66b1a2c81ca8ad33d4f4a046.mockapi.io/todo/${todo.id}`, todo)
          .then(({ data }) => setTodos(todos.map(el => el.id === data.id ? data : el)));
    } else {
      axios.post('https://66b1a2c81ca8ad33d4f4a046.mockapi.io/todo', todo)
          .then(({ data }) => setTodos([...todos, data]));
    }
    setTodo({
      title: '',
      required: false,
      isDone: false,
      asset: '',
      createdAt: new Date().toISOString()
    });
  };


  const handleDone = (todo) => {
    const newData = { ...todo, isDone: true };
    axios.put(`https://66b1a2c81ca8ad33d4f4a046.mockapi.io/todo/${todo.id}`, newData)
        .then(({ data }) => {
          setTodos(todos.map(el => el.id === data.id ? data : el));
        });
  };

  const handleEdit = (todo) => {
    setTodo({
      ...todo,
      createdAt: todo.createdAt || new Date().toISOString()
    });
  };

  const handleDelete = (todo) => {
    axios.delete(`https://66b1a2c81ca8ad33d4f4a046.mockapi.io/todo/${todo.id}`)
        .then(({ data }) => setTodos(todos.filter(el => el.id !== data.id)));
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', 'gallery');
      axios.post(`https://api.cloudinary.com/v1_1/dwpli2x6r/image/upload`, formData)
          .then(({ data }) => setTodo({ ...todo, asset: data.url }));
    }
  };

  return (
      <div className={'container'}>
        <div className={'wrapper'}>
          <h2 className={'todo'}>My Todo List</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 w-50">
              <label htmlFor="todoTitle" className={'form-label'}>Todo task</label>
              <input
                  value={todo.title}
                  onChange={e => setTodo({...todo, title: e.target.value})}
                  type="text" className={'form-control'} id={'todoTitle'}/>
            </div>
            <div className="mb-3 form-check">
              <input
                  onChange={e => setTodo({...todo, required: e.target.checked})}
                  type="checkbox" checked={todo.required} className={'form-check-input'} id={'requiredCheck'}/>
              <label className={"form-check-label"} htmlFor="requiredCheck">Required</label>
            </div>
            <div>
              <input type="checkbox" defaultChecked={isAsset || (todo.id && todo.asset)}
                     onChange={(e) => setIsAsset(e.target.checked)} id={'asset'}/>
              <label className={'form-check-label'} htmlFor="asset">Asset</label>
            </div>
            {isAsset || (todo.id && todo.asset) ?
                <div>
                  <input type="file" onChange={handleUpload}/>
                  {todo?.asset && <img style={{width: '280px'}} src={todo?.asset} alt="asset"/>}
                </div>
                :
                <input type="text" value={todo.asset} onChange={e => setTodo({...todo, asset: e.target.value})}/>
            }
            <button type="submit" className={"btn"}>Submit</button>
          </form>
          <div className={' mt-3'}>
            {todos.map(todo =>
                <div className={'bor'}>
                  <TodoItem
                      todo={todo}
                      key={todo.id}
                      handleDone={handleDone}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                  />
                </div>
            )}
          </div>
        </div>

      </div>)
}

export default App