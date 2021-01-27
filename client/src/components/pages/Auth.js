import React, { useState, useContext } from 'react';
import './Auth.css'
import Card from '../UIElements/Card'
import Input from '../UIElements/Input'
import Button from '../UIElements/Button'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators'
import { useForm } from '../../hooks/form-hook'
import { AuthContext } from '../../context/auth-context'

const Auth = () => {

    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    })

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({...formState.inputs, name: undefined}, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }


    return (
        <Card className="authentication">
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
                <Input 
                    element="input" 
                    id="name" 
                    type="text" 
                    label="Your Name" 
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name"
                    onInput={inputHandler}  
                    />
            )}
            <Input 
                element="input"  
                type="email" 
                id="email" 
                label="email" 
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address"
                onInput={inputHandler}
            />   
            <Input 
                element="input"  
                type="password" 
                id="password" 
                label="Password" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid password of at least 5 characters"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>   
        </form>
        <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
        </Card>
    )
}

export default Auth