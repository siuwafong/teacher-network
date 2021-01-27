import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import '../UIElements/Input.css'
import { AuthContext } from '../../context/auth-context'
import './NavLinks.css'

const NavLinks = props => {

    const auth = useContext(AuthContext)

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>HOME</NavLink>
        </li>
        {auth.isLoggedIn && <li>
            <NavLink to="/:userid/profile">MY PROFILE</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to="/newpost">MAKE POST</NavLink>
        </li>}
        {!auth.isLoggedIn && <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>}
        {auth.isLoggedIn && (
        <li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>)}
        <li>
            <input name="search-form" className="search-form" placeholder="Search" maxLength="30"/>
        </li>
    </ul>
}

export default NavLinks