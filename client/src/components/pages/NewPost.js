import React from 'react';
import Card from '../UIElements/Card'
import Input from '../UIElements/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'
import { useForm } from '../../hooks/form-hook'
import Button from '../UIElements/Button'

import './NewPost.css'

const NewPost = () => {
    const [formState, inputHandler] = 
    useForm({
            title: {
                value: '',
                isValid: false
            },
            postContent: {
                value: '',
                isValid: false
            },
            link: {
                value: '',
                isValid: false
            }
    }, false)

    const postSubmitHandler = e => {
        e.preventDefault();
    }

    return (
        // TODO add tags input
        <form className="post-form" onSubmit={postSubmitHandler}>
            <Input 
                id="title"
                element="input"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter title"
                onInput={inputHandler}
            />
            <Input 
                id="postContent"
                onInput={inputHandler}
                label="Post"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                errorText="Post must be at least 10 characters long"
                element="text"            
            />
            <Input 
                id="link"
                element="input"
                label="Link (optional)"
                onInput={inputHandler}
            />
        <div className="buttonRow">
        <Button type="submit" disabled={!formState.isValid}>
            SUBMIT POST
        </Button>
        <Button className="button--danger">
            CANCEL
        </Button>
        </div>
        </form>
    )
}

export default NewPost