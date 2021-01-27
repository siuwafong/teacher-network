import React from 'react';
import './PostsList.css'
import Card from '../UIElements/Card'
import Button from '../UIElements/Button'
import Post from './Post'

const PostsList = props => {
    if (props.items.length === 0 ) {
        return (
            <div className="post-list center">
                <Card>
                    <h2>No posts yet. Feel free to make one!</h2>
                    <Button to="/newpost">Make a Post</Button>
                </Card>
            </div>
        )
    }

    return (   
    <ul className="post-list">
        {props.items.map(post => (
            <Post
                key={post.id}
                id={post.id}
                title={post.title}
                postContent={post.postContent}
                creatorId={post.creator}
                link={post.link}
            />
        ))}
    </ul>
    )
}

export default PostsList