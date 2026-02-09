// Middleware to check if the reference exists

const verifyPaymentMiddleware = (req, res, next) => {

    // get the reference from the request parameter
    const { reference } = req.params

    // check if the reference exists
    if (!reference) {
        // send an error message if it does not exist
        return res.status(400).json({ message: 'Invalid or missing payment reference.' })
    }
    
    // if it is available, move on to the next middleware or controller function
    next()

}

// export the middleware
module.exports = verifyPaymentMiddleware