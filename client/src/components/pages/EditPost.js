import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Input from '../UIElements/Input'
import Button from '../UIElements/Button'
import { useForm } from '../../hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'
import Card from '../UIElements/Card'

const DUMMY_POSTS = [
    {
        id: 'p1',
        title: "This is a my lesson idea",
        postContent: "Give homework everyday",
        creator: 'u1',
        link: 'en.wikipedia.org'
    },
    {
        id: 'p2',
        title: "I need help",
        postContent: "I'm overworked. Can anyone give me any ideas on how to destress?",
        creator: 'u2',
        // link: 'www.google.ca'
    },
    {
        id: 'p3',
        title: "A good math resource",
        postContent: "This link is really good for all grade levels",
        creator: 'u3',
        link: 'www.khanacademy.com'
    },
    {
        id: 'p4',
        title: "Useful graphing calculator",
        postContent: "This online calculator is really good for graphing functions. I highly recommend it.",
        creator: 'u2',
        link: 'www.desmos.com'
    },
    {
        id: 'p5',
        title: "Request: Good calculus resources?",
        postContent: "I'm teaching calculus for the first time. Can anyone suggest some good online resources?",
        creator: 'u2',
        // link: 'www.google.ca'
    },
    {
        id: 'p6',
        title: "My trigonometry worksheets",
        postContent: "Here is a link to my trigonometry worksheets. Feel free to use them!",
        creator: 'u3',
        link: 'www.google.ca'
    },
]

const EditPost = () => {
    const [isLoading, setIsLoading] = useState(true)

    const pId = useParams().id
    // const pId = "p3"


    const [formState, inputHandler, setFormData] = useForm({
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



    const identifiedPost = DUMMY_POSTS.find(p => p.id === pId)

    useEffect(() => {
        if (identifiedPost) {
            setFormData({
                title: {
                    value: identifiedPost.title,
                    isValid: true
                },
                postContent: {
                    value: identifiedPost.postContent,
                    isValid: true
                }, 
                link: {
                    value: identifiedPost.link,
                    isValid: true
                }
            }, true)
        }
        setIsLoading(false)
    },
        [setFormData, identifiedPost]
    )

    const postUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    if (!identifiedPost) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find post!</h2>
                </Card>
            </div>
        )
    }

    return (
        <form className="post-form" onSubmit={postUpdateSubmitHandler}>
            <Input 
                id="title" 
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title" 
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input 
                id="postContent" 
                element="textarea" 
                label="Post" 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                errorText="Post must be at least 10 characters long" 
                onInput={inputHandler}
                initialValue={formState.inputs.postContent.value}
                initialValid={formState.inputs.postContent.isValid}
            />
            <Input 
                id="link"
                element="input"
                label="Link (optional)"
                onInput={inputHandler}
                initialValue={formState.inputs.link.value}
                initialValid={formState.inputs.link.isValid}
                validators={[]}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    )
}

export default EditPost