import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import './app/index.css'
import App from './app/App.tsx'
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
