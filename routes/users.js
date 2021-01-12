const express = require('express')
const router = express.Router()
const request = require('request')

const User = require('../models/User')

// @route GET /
// @desc Test route
// @access Public
router.get('/getInfo', (req, res) => {
    request('https://pokeapi.co/api/v2/pokemon/ditto',
    (err, reponse, body) => {
        if (!err && res.statusCode === 200) {
            let parsedBody = JSON.parse(body)
            
            let species = parsedBody.species.name
            console.log(species)
            res.send(species)
        }
    }
    )
})

// @route POST /
// @desc Register user
// @access Public
router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        await User.create(req.body)
        console.log('registration successful')
        res.send("OK!")
    } catch (err) {
        console.error(err)
        res.send('500 error')
    }
})


module.exports = router;