import { App } from './typescript/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('game')!
)

const element = <App />;

root.render(element);
