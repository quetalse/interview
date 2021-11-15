import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./datamanager/context";

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);