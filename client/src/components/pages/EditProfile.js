import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Input from '../UIElements/Input'
import Button from '../UIElements/Button'
import { useForm } from '../../hooks/form-hook'
import { VALIDATOR_REQUIRE } from '../../utils/validators'
import Card from '../UIElements/Card'
import './EditProfile.css'
import { v4 as uuidv4 } from 'uuid'


const DUMMY_PROFILE = [
    {
    profileId: "p1",
    username: "wfong1002",
    firstName: "Wilson",
    lastName: "Fong",
    joinDate: "Jan. 26, 2021",
    gradeLevel: "9-12",
    subjects: ["math", "economics"],
    friends: ["NGTyson", "EMusk"],
    friendRequests: ["Joe_Biden", "BillG"]
    },
]

const EditProfile = props => {
    const [isLoading, setIsLoading] = useState(true)
    const profileId = useParams().profileId

    const [formState, inputHandler, setFormData] = useForm({
        firstName: {
            value: '',
            isValid: false
        },
        lastName: {
            value: '',
            isValid: false
        },
        gradeLevel: {
            value: '',
            isValid: false
        }, 
        subjects: {
            value: '',
            isValid: true
        }
    }, false)

    const identifiedProfile = DUMMY_PROFILE.find(p => p.profileId === profileId)

    const [profileSubjects, setProfileSubjects] = useState(identifiedProfile.subjects)
    const [profileGradeLevel, setProfileGradeLevel] = useState(identifiedProfile.gradeLevel)
    const [profileFriends, setProfileFriends] = useState(identifiedProfile.friends)
    const [profileFriendRequests, setProfileFriendRequests] = useState(identifiedProfile.friendRequests)
    
    const grades = ["1-3", "4-6", "7-8", "9-12"]
    const subjects = ["English", "math", "economics", "business studies", "science", "French", "social studies", "music", "PE", "French"]

    useEffect(() => {
        if (identifiedProfile) {
            setFormData({
                firstName: {
                    value: identifiedProfile.firstName,
                    isValid: true
                },
                lastName: {
                    value: identifiedProfile.lastName,
                    isValid: true
                },
            }, true)
        }
        setIsLoading(false)
    },
        [setFormData, identifiedProfile]
    )

    const profileUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs, profileGradeLevel, profileSubjects)
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    if (!identifiedProfile) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find profile!</h2>
                </Card>
            </div>
        )
    }
    
    const onChangeHandler = e => {
        if (e.target.type === "checkbox") {
            if (profileSubjects.includes(e.target.value)) {
                setProfileSubjects(profileSubjects.filter(subject => subject !== e.target.value))
            } else {
                setProfileSubjects([...profileSubjects, e.target.value])
            }
        } else if (e.target.type.slice(0, 6) === "select") {
            setProfileGradeLevel(e.target.value)
        }
    }

    const friendHandler = (friend, type) => {
        if (type === "delete") {
            setProfileFriends(profileFriends.filter(item => item !== friend))
        } else if (type === "add") {
            setProfileFriendRequests(profileFriendRequests.filter(request => request !== friend))
            setProfileFriends([...profileFriends, friend])
        } else if (type === "ignore") {
            setProfileFriendRequests(profileFriendRequests.filter(request => request !== friend))
        }
    }

    return (
        <form className="profile-form" onSubmit={profileUpdateSubmitHandler}>
            <h3 className="username">{identifiedProfile.username}</h3>
            <p className="username-msg">(Your username cannot be changed)</p>
            <Input 
                id="firstName" 
                element="input" 
                type="text" 
                label="First Name" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid first name" 
                onInput={inputHandler}
                initialValue={formState.inputs.firstName.value}
                initialValid={formState.inputs.firstName.isValid}
            />
            <Input 
                id="lastName" 
                element="input" 
                type="text" 
                label="Last Name" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid last name" 
                onInput={inputHandler}
                initialValue={formState.inputs.lastName.value}
                initialValid={formState.inputs.lastName.isValid}
            />
            <div className="Profile__grade">
                <div className="Profile__grade-label">Grades</div>
                <select name="grade" defaultValue={profileGradeLevel} onChange={e => onChangeHandler(e)}>
                    {grades.map(grade => (
                        <option key={uuidv4()} value={grade} >{grade}</option>
                    ))}
                </select>
            </div>

            <div className="Profile__subjects">
                <div className="Profile__subjects-label">Subjects</div>
                {subjects.map(subject => (
                    <div className="Profile__subject" key={uuidv4()}>
                        <input type="checkbox" id={subject} value={subject} onChange={e => onChangeHandler(e)} checked={profileSubjects.includes(subject)} />
                        <label htmlFor={subject}>{subject}</label>
                    </div>
                ))}
            </div>
            <div className="editProfileBtn">
                <Button type="submit" disabled={!formState.isValid}>
                    UPDATE PROFILE
                </Button>
            </div>

            <div className="Profile__friends-list">
                <h3>Friends</h3>
                {profileFriends.length === 0 
                ? 
                (
                    <h3 className="Profile__friends-msg">You have no friends! :(</h3>
                )
                :
                (
                    profileFriends.map(friend => (
                        <div className="friend-item" key={uuidv4()}>
                        <p>{friend}</p>
                        <button className="friendBtn" onClick={() => friendHandler(friend, "delete")}>DELETE</button>
                        </div>
                    ))
                )
                }
            </div>
            <h3>Friend Requests</h3>
            {profileFriendRequests.length === 0 
            ?
            (
                <h3 className="Profile__friends-msg">No friend requests...</h3>
            )
            :
            (
                profileFriendRequests.map(request => (
                    <div className="friend-item" key={uuidv4()}>
                        <p>{request}</p>
                        <div className="friendBtns">
                            <button className="addFriendBtn" onClick={() => friendHandler(request, "add")}>ADD</button>
                            <button className="friendBtn" onClick={() => friendHandler(request, "ignore")} >IGNORE</button>
                        </div>
                    </div>
                ))
            )
            }
        </form>
    )
}

export default EditProfile