// import the express module
const express = require('express')

// create a minimalist express router
const router = express.Router()

// import the controller functiont to intiate and verify payments
const { initiatePayment, verifyPayment } = require('../controllers/paymentController')

// import the middleware to initiate the payment
const initPaymentMiddleware = require('../middleware/initiatePayment')

// import the middleware to verify the payment
const verifyPaymentMiddleware = require('../middleware/verifyPayment')

// url to initiate the payment
router.post('/initPayment', initPaymentMiddleware, initiatePayment)
// route to verify the payment
router.post('/verifyPayment/:reference', verifyPaymentMiddleware, verifyPayment)


// export the router to gain access to it in server.js
module.exports = router