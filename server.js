const { response } = require('express')
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const path = require('path')


// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false}))
app.use(express.urlencoded({ extended: false }))

// Define routes
app.use('/', require('./routes/users'))

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder (i.e., the index.html file in the client build folder)
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

