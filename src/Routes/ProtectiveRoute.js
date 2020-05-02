import React, { useState, useLayoutEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

function ProtectiveRoute({authentificated, component: Component, path, api, nodejsApi, history, user, ...rest}) {
    return <Route path={path} {...rest} component={(props) => {
        if(authentificated) {
            if(path === '/'){
                return <Redirect to="/domov"/>
            }
            return <Component {...props} api={api} nodejsApi={nodejsApi} history={history} user={user} />
        } 
        else{
            if(path === '/'){
                return <Component {...props} api={api} />
            }
            return <Redirect to="/"/>
        }
    }}/>
}
export default withRouter(ProtectiveRoute)