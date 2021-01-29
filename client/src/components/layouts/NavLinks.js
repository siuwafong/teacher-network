import React, { useContext, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import '../UIElements/Input.css'
import { AuthContext } from '../../context/auth-context'
import './NavLinks.css'

const NavLinks = props => {

    const auth = useContext(AuthContext)

    const [searchTerm, setSearchTerm] = useState("")
    const [redirect, setRedirect] = useState(false)

    const search = (e) => {
        e.preventDefault()
        console.log(searchTerm.length)
        if (searchTerm.length !== 0) {
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Redirect to={{
            pathname: "/searchResults",
            state: {searchTerm: searchTerm},
            term: searchTerm
        }} />
    }

    const searchHandler = (e) => {
        setSearchTerm(e.target.value)
        console.log(searchTerm)
    }

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>HOME</NavLink>
        </li>
        {auth.isLoggedIn && <li>
            <NavLink to="/editprofile/:profileId">MY PROFILE</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to="/newpost">MAKE POST</NavLink>
        </li>}
        {!auth.isLoggedIn && <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>}
        <li>
            <form onSubmit={e => search(e)}>
            <input 
                name="search-form" 
                className="search-form" 
                placeholder="Search" 
                maxLength="30"
                onChange={e => searchHandler(e)}
                value={searchTerm}
            />
            <button type="submit">Search</button>
            </form>
        </li>
        {auth.isLoggedIn && (
        <li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>)}
    </ul>
}

export default NavLinks