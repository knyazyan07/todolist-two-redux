import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './components/action';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './App.css'

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [editTodo, setEditTodo] = useState({ id: null, text: '' });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim() !== '') {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleEdit = (id, text) => {
    setEditTodo({ id, text });
  };

  const handleUpdateTodo = () => {
    if (editTodo.text.trim() !== '') {
      dispatch(toggleTodo(editTodo.id, editTodo.text));
      setEditTodo({ id: null, text: '' });
    }
  };

  return (
    <>
      <div className='content'>
        <div className='container'>
          <div>
            <form className='form-content' onSubmit={handleAddTodo}>
              <div>
                <input
                  className='form-input'
                  type="text"
                  placeholder="add todo"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                />
              </div>
              <Stack spacing={2} direction="row">
                <Button onClick={handleAddTodo} style={{ padding: 7 }} variant="contained">add</Button>
              </Stack>
            </form>
            <ul>
              {todos.map((todo) => (
                <p key={todo.id} className='block'>
                  {editTodo.id === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editTodo.text}
                        onChange={(e) =>
                          setEditTodo({
                            id: editTodo.id,
                            text: e.target.value,
                          })
                        }
                      />
                      <button onClick={handleUpdateTodo}>Update</button>
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => handleToggleTodo(todo.id)}
                      >
                        {todo.text}
                      </p>
                     <div>
                     <button className='btn' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                      <button className='btn' onClick={() => handleToggleEdit(todo.id, todo.text)}>Edit</button>
                     </div>
                    </>
                  )}
                </p>
              ))}
            </ul>
          </div>
          <div className='number'>
            <p className='todo-number'>1/{todos.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
