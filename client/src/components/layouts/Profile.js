import React from 'react';
import Card from '../UIElements/Card'
import './Profile.css'
import Button from '../UIElements/Button'

const Profile = props => {

    const DUMMY_PROFILE = 
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
        }


    return (
        <Card className="Profile">
                <p className="Profile__heading">Profile</p>
                <img alt="Profile__pic" className="Profile__pic" src="./img/person-placeholder.png"></img>
                <p><span className="Profile__label">Username: </span>{DUMMY_PROFILE.username}</p>
                <p><span className="Profile__label">Name: </span>{`${DUMMY_PROFILE.firstName} ${DUMMY_PROFILE.lastName}`}</p>
                <p><span className="Profile__label">Date Joined: </span>{DUMMY_PROFILE.joinDate} </p>
                <p><span className="Profile__label">Grades: </span>{DUMMY_PROFILE.gradeLevel} </p>
                <p><span className="Profile__label">Subjects: </span>{DUMMY_PROFILE.subjects.map(subject => (<div>{subject}</div>))} </p>
                <Button to="/editprofile/:id">
                    EDIT PROFILE
                </Button>
        </Card>
    )
}

export default Profile