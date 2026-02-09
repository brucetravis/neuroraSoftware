// Allow node.js to check for any environment variables
require('dotenv').config()

// import the express framework to create the server
const express = require('express')

// import the cors module to handle cross-origin requests
const cors = require('cors')

// create the server
const app = express() // we call express to create the server


// middleware to convert each request into a JavaScript object (requests are usuallyu in JSON format)
app.use(express.json())
app.use(cors()) // Allow requests from any origin (We will limit it to only the frontend later)


// import the route to initiate payments
const paymentRoutes = require('./routes/paymentRoute')
// import the index route
const IndexRoute = require('./routes/indexRoute')
// import the aiRoute
const aiRoute = require('./routes/aiRoute')

// middleware to use the payment route
app.use('/paymentAPI', paymentRoutes) // All payment routes start with '/paymentAPI'
app.use('/initRoute', IndexRoute)
app.use('/aiAPI', aiRoute)


// set the port for the backend server
const PORT = 5000

// listen/listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})




