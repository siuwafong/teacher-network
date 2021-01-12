import React, { useState } from 'react';
import axios from 'axios'

const Login = () => {

    const [data, setData] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const getData = () => {
        axios.get('/getInfo').then(res => {
        console.log(res.data)
        setData(res.data)
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.name === "name") {
            setName(e.target.value)
        }  else if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        console.log(`name: ${name}`, `password: ${password}`, `email: ${email}`)
    }
    
    const signup = (e) => {
        console.log("ran the signup function already")
    }

    return (
        <div>
            <button onClick={getData}>Get Data</button> 
            <p>{data}</p>

            <form action="/signup" method="POST">
                <input name="name" type="text" value={name} onChange={e=> handleChange(e)} placeholder="name"/>
                <input name="email" type="email" value={email} onChange={e => handleChange(e)} placeholder="email"/>
                <input name="password" type="password" value={password} onChange={e => handleChange(e)} placeholder="password"/> 
                <button type="submit" onClick={signup}>SUBMIT</button>
            </form>
        </div>
    )
}

export default Login;
