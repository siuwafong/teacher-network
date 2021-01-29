import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context'
import PostsList from '../layouts/PostsList'
import Profile from '../layouts/Profile'
import './Home.css'


const Home = () => {

    const auth = useContext(AuthContext)

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
            postContent: "I'm overworked. Can anyone give me any ideas on how to destress? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            creator: 'u2',
            // link: 'www.google.ca'
        },
        {
            id: 'p3',
            title: "A good math resource",
            postContent: "This link ",
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

    return (
    <div className="Home">
        {auth.isLoggedIn && 
            <Profile className="Home-profile"/>
        }
            <h2 className="Home-title">Recent Posts</h2>
            <PostsList shortenText={true} items={DUMMY_POSTS}/>
    </div>
    )
}

export default Home