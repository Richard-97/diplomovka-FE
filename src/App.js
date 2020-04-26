import React, { useState, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import auth from './utils/auth';

import UserContext from './Context';
import ProtectedRoute from './Routes/ProtectiveRoute';

import LogIn from './containers/LogIn';
import Registration from './containers/Registration';
import Home from './containers/Home';
import SmartModel from './containers/SmartModel';
import SimpleController from './containers/SimpleController';
import Settings from './containers/Settings';
import Profile from './containers/Profile';

import Menu from './components/Menu/Menu';

const App = ({api, nodejsApi, history, clearAuth}) => {

    const [userID, setUserID] = useState(undefined);
    const [firstName, setFirstName] = useState('Richard');
    const [lastName, setLastName] = useState('Rusňák');
    const [email, setEmail] = useState('richard.rusnak@student.tuke.sk');

    //const api = 'https://diplomovka-be.herokuapp.com/';
    
    return (

        <div className="container">
          { (window.location.pathname !== '/' && window.location.pathname !== '/registracia') && <Menu clearAuth={clearAuth} />}
          <ProtectedRoute 
            exact 
            path='/' 
            authentificated={auth.isAuthentificated()} 
            api={api} 
            nodejsApi={nodejsApi} 
            history={history}
            component={LogIn} 
          />
          <Route 
            path='/registracia' 
            component={()=><Registration api={api}/>} 
          />
          <ProtectedRoute 
            path='/domov' 
            api={api} 
            nodejsApi={nodejsApi} 
            authentificated={auth.isAuthentificated()} 
            clearAuth={clearAuth}
            user={auth.getUser()}
            component={Home}
          />
          <ProtectedRoute 
            path='/modelpriestoru' 
            authentificated={auth.isAuthentificated()} 
            api={api} 
            nodejsApi={nodejsApi} 
            component={SmartModel} 
            user={auth.getUser()}
          />
          <ProtectedRoute 
            path='/jednoducheovladanie' 
            authentificated={auth.isAuthentificated()} 
            api={api} 
            nodejsApi={nodejsApi} 
            component={SimpleController}
            user={auth.getUser()}
          />
          <ProtectedRoute 
            path='/nastavenia' 
            authentificated={auth.isAuthentificated()} 
            api={api} 
            nodejsApi={nodejsApi} 
            component={Settings} 
            user={auth.getUser()}
          />
          <Route 
            path='/profil' 
            authentificated={auth.isAuthentificated()} 
            api={api} 
            nodejsApi={nodejsApi} 
            component={Profile}
          />
        </div>
    );
}

export default withRouter(App);
