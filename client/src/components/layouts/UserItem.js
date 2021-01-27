import React from 'react';
import Card from '../UIElements/Card'
import { Link } from 'react-router-dom'
import './UserItem.css'


const UserItem = props => {

    console.log(props.id)
    return (
        <li className="user-item">
            <div>
                <Card className="user-item__content">
                    <Link to={`/${props.id}/places`}>
                        <div className="user-item__image">
                            {/* <Avatar image={props.image} alt={props.name} /> */}
                        </div>
                        <div className="user-item__info">
                            <h2>{props.name}</h2>
                            <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                        </div>
                    </Link>
                </Card>
            </div>
        </li>
    );
};

export default UserItem