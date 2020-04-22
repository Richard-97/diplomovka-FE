import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
serviceWorker.unregister();
