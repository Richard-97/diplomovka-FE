import React, { useState } from 'react';
import { withRouter, Link } from "react-router-dom";
import Input from '../Input/Input';
import Button from '../Button/Button';

const LogInForm = ({ api, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value)
    }
    const onSubmitButton = async () => {
        try{
            const resp = await fetch(`${api}/logIn`,{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await resp.json()
            data.response === 'success' ? history.push("/domov") : setError(true);
        }
        catch(event){
            setError(true);
        }

    }
    return (
        <div className = 'loginForm'>
            <div className = 'loginForm-image'>   

            </div>
            <div className = 'loginForm-field'>
                <h6>Vitajte</h6>
                <Input type = 'email' placeholder = 'email@priklad.sk' text = 'Email' onChange = {onEmailChangeHandler} />
                <Input type = 'password' placeholder = 'tajomstvo' text = 'Heslo' onChange = {onPasswordChangeHandler} />
                <Link to = 'registracia' className = 'link'>
                    <p className = 'loginForm-field_p'>Nemate účet? <strong>Zaregistrujte sa!</strong> </p>
                </Link>
                <Button text = 'Prihlásiť' onClick = {()=>onSubmitButton()} />
                {error && <p className = 'loginForm-field_p'>Chybné prihlasovacie údaje.</p>}
            </div>
        </div>
    )
}

export default withRouter(LogInForm);
