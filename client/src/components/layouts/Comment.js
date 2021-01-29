import React from 'react';
import Card from '../UIElements/Card'

import './Comment.css'

const Comment = props => {
    
    return (
        <div className="Comment">
            <Card className="Comment__card">
                <div> <span className="Comment__label">By: </span>{props.name}</div>
                <div> <span className="Comment__label">Posted on: </span>{props.date}</div>
                <div> {props.comment}</div>
            </Card>
        </div>
    )
}

export default Comment