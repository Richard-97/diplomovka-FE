import React, { useState, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import auth from './utils/auth';

import ProtectedRoute from './Routes/ProtectiveRoute';

import LogIn from './containers/LogIn';
import Registration from './containers/Registration';
import Home from './containers/Home';
import SmartModel from './containers/SmartModel';
import SimpleController from './containers/SimpleController';
import Profile from './containers/Profile';
import Overview from './containers/Overview';

import Menu from './components/Menu/Menu';

const App = ({api, nodejsApi, history, clearAuth}) => {
    
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
            user={auth.getUser()}
          />
          <ProtectedRoute 
            path='/profil' 
            authentificated={auth.isAuthentificated()} 
            api={api} 
            nodejsApi={nodejsApi} 
            user={auth.getUser()}
            component={Profile}
          />
          <ProtectedRoute 
            path='/prehlad' 
            authentificated={auth.isAuthentificated()} 
            api={api} 
            user={auth.getUser()}
            component={Overview}
          />
        </div>
    );
}

export default withRouter(App);
