import React, { Component } from 'react'
import LoginForm from '../components/LogInForm/LogInForm';

export default function LogIn({ api }){

  return (
    <div className = 'logIn-bcg'>
      <LoginForm api={api} />
    </div>
  )
}
