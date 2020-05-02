import React from 'react';
import Model from '../components/Model/Model';

const SmartModel = ({api, nodejsApi, user}) => {
  return (
    <div className='smartmodel'>
      <Model api={api} nodejsApi={nodejsApi} userID={user.id} />
    </div>
  );
}

export default SmartModel;