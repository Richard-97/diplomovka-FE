import React, { Component } from 'react'

import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

export default function Registration({ api }) {
  return (
    <div className = 'registration-bcg'>
      <RegistrationForm api={api} />
    </div>
  )

}
