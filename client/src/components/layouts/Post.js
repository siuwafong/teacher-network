import React, { useContext, useState, Fragment } from 'react';
import Card from '../UIElements/Card'
import Button from '../UIElements/Button'
import Modal from '../UIElements/Modal'
import { AuthContext } from '../../context/auth-context'
import './Post.css'

const Post = props => {

    const auth = useContext(AuthContext)

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false)
        console.log("DELETING...")
    }

    return (
    <Fragment>
        <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?" 
            footerClass="place-item__modal-actions" 
            footer={
            <Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
            </Fragment>
        }>
            <p>Do you want to proceed and delete this post? Please note that this cannot be undone.</p>
        </Modal>
        <li className="post-item">
            <Card className="post-item__content">
                <div className="post-item__info">
                    <h2>{props.title}</h2>
                    {props.link !== undefined && <div><span>Link: </span><a href={props.link}>{props.link}</a></div>}
                    <div><span>By: </span>{props.creatorId}</div>
                    <p>{(props.postContent.length < 120 && props.shortenText === true) ? props.postContent : `${props.postContent.slice(0, 120)}...` }</p>
                </div>
                <div className="post-item__actions">
                    <Button inverse to={`/posts/${props.id}`}>VIEW</Button>
                    {auth.isLoggedIn && 
                    <Button to={`/posts/${props.id}/edit`}>EDIT</Button>
                    }
                    {auth.isLoggedIn && 
                    <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                    }
                </div>
                {/* {props.showDetails === true 
                ? 
                (
                    <div className="post-item__details">
                        <div> post details... </div>
                    </div>
                )
                :
                (
                    ""
                )
                } */}
            </Card>
        </li>
    </Fragment>
    )
}

export default Post