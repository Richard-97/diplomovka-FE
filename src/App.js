import React, { useState } from 'react';
import { withRouter, Route } from 'react-router-dom';

import UserContext from './Context';

import LogIn from './containers/LogIn';
import Registration from './containers/Registration';
import Home from './containers/Home';
import SmartModel from './containers/SmartModel';
import SimpleController from './containers/SimpleController';
import Settings from './containers/Settings';
import Profile from './containers/Profile';

import Menu from './components/Menu/Menu';

const App = () => {

    const [userID, setUserID] = useState(undefined);
    const [firstName, setFirstName] = useState('Richard');
    const [lastName, setLastName] = useState('Rusňák');
    const [email, setEmail] = useState('richard.rusnak@student.tuke.sk');

    const api = 'http://localhost:5000';
    return (
      <UserContext.Provider value={{
        userID,
        firstName,
        lastName,
        email,
        admin: false,
        smart_mode: false,
        api
      }}>
        <div className="container">
          { (window.location.pathname !== '/' && window.location.pathname !== '/registracia') && <Menu />}
          <Route exact path='/' component={()=><LogIn api={api}/>} />
          <Route path='/registracia' component={()=><Registration api={api}/>} />
          <Route path='/domov' component={()=><Home api={api} />} />
          <Route path='/modelpriestoru' component={SmartModel} />
          <Route path='/jednoducheovladanie' component={()=><SimpleController user_id={userID}/>}  />
          <Route path='/nastavenia' component={Settings} />
          <Route path='/profil' component={Profile} />
        </div>
      </UserContext.Provider>
    );
}

export default withRouter(App);
