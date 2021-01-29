import React, { useState, useEffect } from 'react';
import Post from '../layouts/Post'
import { useParams, Link } from 'react-router-dom'
import Card from '../UIElements/Card'
import Comment from '../layouts/Comment'
import { v4 as uuidv4 } from 'uuid'

import './PostDetails.css'


const DUMMY_PROFILE = {
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

const DUMMY_POSTS = [
    {
        id: 'p1',
        title: "This is a my lesson idea",
        postContent: "Give homework everyday",
        creator: 'u1',
        link: 'en.wikipedia.org',
        comments: [
            {
                username: "abc",
                comment: "This is an amazing idea!",
                date: "Jan. 29, 2021",
                id: "c1"
            },
            {
                username: "xyz",
                comment: "Interesting...I'll think about it",
                date: "Jan. 28, 2021",
                id: "c2"
            }
        ],
        likes: ["wfong1002", "random_Teacher:)"]
    },
    {
        id: 'p2',
        title: "I need help",
        postContent: "I'm overworked. Can anyone give me any ideas on how to destress? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        creator: 'u2',
        // link: 'www.google.ca',
        comments: [{}],
        likes: [{}]
    },
    {
        id: 'p3',
        title: "A good math resource",
        postContent: "This link is really good for all grade levels",
        creator: 'u3',
        link: 'www.khanacademy.com',
        comments: [{}],
        likes: [{}]
    },
    {
        id: 'p4',
        title: "Useful graphing calculator",
        postContent: "This online calculator is really good for graphing functions. I highly recommend it.",
        creator: 'u2',
        link: 'www.desmos.com',
        comments: [{}],
        likes: [{}]
    },
    {
        id: 'p5',
        title: "Request: Good calculus resources?",
        postContent: "I'm teaching calculus for the first time. Can anyone suggest some good online resources?",
        creator: 'u2',
        // link: 'www.google.ca',
        comments: [{}],
        likes: [{}]
    },
    {
        id: 'p6',
        title: "My trigonometry worksheets",
        postContent: "Here is a link to my trigonometry worksheets. Feel free to use them!",
        creator: 'u3',
        link: 'www.google.ca',
        comments: [{}],
        likes: [{}]
    },
]

const PostDetails = props => {
    const [isLoading, setIsLoading] = useState(true)
    
    const pId = useParams().postId

    const identifiedPost = DUMMY_POSTS.find(p => p.id === pId)

    // change useState to check whether the likes array includes the actual user, not "wfong1002"
    const [liked, setLiked] = useState(identifiedPost.likes.includes("wfong1002"))
    const [likes, setLikes] = useState(identifiedPost.likes)
    const [friendsWith, setFriendsWith] = useState(DUMMY_PROFILE.friends.includes(identifiedPost.creator))
    const [sentRequest, setSentRequest] = useState(DUMMY_PROFILE.friendRequests.includes(identifiedPost.creator))
    const [comments, setComments] = useState(identifiedPost.comments)
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        if (identifiedPost) {
            setIsLoading(false)
        }}, [identifiedPost])


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
                    <h2>Could not find profile!</h2>
                </Card>
            </div>
        )
    }

    const toggleLike = () => {
        setLiked(!liked)
        // change code to replace "wfong1002" with the acutal user name 
        if (likes.includes("wfong1002")) {
            setLikes(likes.filter(like => like !== "wfong1002"))
        } else {
            setLikes([...likes, "wfong1002"])
        }
    }

    const requestHandler = () => {
        setSentRequest(true)
    }

    const commentHandler = (e) => {
        console.log(e.target.value)
        setNewComment(e.target.value)
    }

    const submitComment = (e) => {
        e.preventDefault()
        if (newComment.length !== 0) {
            setComments([
                ...comments, 
                {
                    // TODO: change the username
                    username: "wfong1002",
                    comment: newComment,
                    date: "Jan. 30, 2021"
                }
            ])
            setNewComment("")
        }
    }


    return (
    <div className="PostDetails">
        <button><Link to="/">Back</Link></button>
        <Post 
            key={identifiedPost.id}
            id={identifiedPost.id}
            title={identifiedPost.title}
            postContent={identifiedPost.postContent}
            creatorId={identifiedPost.creator}
            link={identifiedPost.link}
        />
        <Card>
            <div className="responseContainer">
                <button onClick={toggleLike} className="likeBtn">{liked === true ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}</button>
                <span>{likes.length} {likes.length === 1 ? 'like' : 'likes'} </span> 
                {/* replace code below with actual profile later */}
                {
                    friendsWith === false
                    ?
                        sentRequest === true
                        ?
                        <span className="requestConfirmationMsg"> Friend request sent... </span>
                        :
                        <button className="requestBtn" onClick={requestHandler}><i className="fas fa-user-friends"></i>Send Friend Request</button>
                    :
                    <div> You are friends with {identifiedPost.creator} </div>
                }
                <div>
                    <form onSubmit={e => submitComment(e)}>
                        <input
                            type="text"
                            placeholder="Write comment here"
                            onChange={e => commentHandler(e)}
                            value={newComment}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </Card>
        {comments.map(item => (
            <Comment 
                name={item.username}
                comment={item.comment}
                date={item.date}
                id={item.id}
                key={uuidv4()}
            />
        ))}
    </div>
    )
}

export default PostDetails