import { createStore } from 'redux';
import todoReducer from '../components/todoInput/todoInput';

const store = createStore(todoReducer);

export default store;
