import React from 'react';
const UserContext = React.createContext({
    first_name: '',
    last_name: '',
    email: '',
    admin: '',
    smart_mode: false,
    QaAMaker_question: ''
});
export default UserContext;