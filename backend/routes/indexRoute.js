console.log("✅ indexRoute loaded")

// import the express framework to create a inimalist router
const express = require('express')

// create the minimalist router
const router = express.Router()


router.get('/', (req, res) => {
    res.json("Backend RUNNING")
})

// export the router
module.exports = router

