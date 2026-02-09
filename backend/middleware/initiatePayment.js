// Middleware to initiate the payment process
const initPaymentMiddleware = (req, res, next) => {

    //  get the email and the amount from the request body
    const { email, amount } = req.body

    // check if email and amount exist
    if (!amount || !email) {
        // if they do not exist, return a 400 error respose (Invalid/Missing data)
        return res.status(400).json({ message: 'Cannot initiate payment. Missing email or amount data.' })
    }

    // if the payment was successful, move to the next middleware or contorller
    next()

}


// export the middleware
module.exports = initPaymentMiddleware