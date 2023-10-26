import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, composeWithDevTools()); // 스토어를 만듭니다.
console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
