import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import auth from './utils/auth';

//const api = 'http://88.212.50.96:5000'
const api = 'http://192.168.10.150:5000'
const nodejsApi = 'http://nodejs-be.herokuapp.com';
//const nodejsApi = 'http://localhost:3000'

const RouterComponent = () => {
    const [render, setRender] = useState(false);

    useEffect(() => {
        auth.check(`${api}/user/auth`, localStorage.getItem('token'), () => {
            setRender(true);
        }, (err) => {
            setRender(true);
        })
    }, []);

    const clearAuthentificated = () => {
        auth.logout(() => {
            localStorage.clear();
        });
    }

    return(  
            <Router>
                <Switch>
                    {render && <App api={api} nodejsApi={nodejsApi}  clearAuth={ clearAuthentificated } />}
                </Switch>
            </Router>
    );
}

export default RouterComponent;