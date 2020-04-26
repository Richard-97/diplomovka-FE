import React from 'react';
import Model from '../components/Model/Model';

const SmartModel = ({api}) => {
  return (
    <div className='smartmodel'>
      <Model api={api} />
    </div>
  );
}

export default SmartModel;