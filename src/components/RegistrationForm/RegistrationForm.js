import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

import Input from '../Input/Input';
import Button from '../Button/Button';

const RegistrationForm = ({ api, history }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [error, setError] = useState(false);

    const onFirstNameChangeHandler = (event) => {
        setFirstName(event.target.value)
    }
    const onLastNameChangeHandler = (event) => {
        setLastName(event.target.value)
    }
    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value)
    }
    const onValidatePasswordChangeHandler = (event) => {
        setValidPassword(event.target.value)
    }
    const onRegisterSubmitHandler = async () => {
        try{
            const res = await fetch(`${api}/registration`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName, lastName, email, password, admin: false
                })
            });
            const data = await res.json();
            console.log(data)
            data.response === 'success' ? history.push("/") : setError(true);
        }
        catch(event){
            setError(true);
        }
    }
    return (
        <div className = 'registrationForm'>
            <div className = 'registrationForm-field'>
                <h6>Registrácia</h6>
                <Input type = 'text' placeholder = 'Ján' text = 'Krstné meno' onChange = {onFirstNameChangeHandler} />
                <Input type = 'text' placeholder = 'Novák' text = 'Priezvisko' onChange = {onLastNameChangeHandler} />
                <Input type = 'email' placeholder = 'email@priklad.sk' text = 'Email' onChange = {onEmailChangeHandler} />
                <Input type = 'password' placeholder = 'tajomstvo' text = 'Heslo' onChange = {onPasswordChangeHandler} />
                <Input type = 'password' placeholder = 'tajomstvo' text = 'Zopakujte heslo' onChange = {onValidatePasswordChangeHandler} />
                {
                    !error ?
                        firstName !== '' & lastName !== '' & email !== '' & password !== '' & validPassword !== '' ?
                            <Button text = 'Registrovať' onClick={onRegisterSubmitHandler} />
                            :
                            <p className = 'registrationForm-field_p'>Vyplňte všetky údaje.</p>
                    :
                    <p className = 'registrationForm-field_p'>Chyba registrácie.</p>
                }
            </div>
            <div className = 'registrationForm-image'>

            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);