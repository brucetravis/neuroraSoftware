// import the axios module so that we can make http requests
const axios = require('axios')


// function to initiate user payments
const initiatePayment = async (req, res) => {

    // get the email and the amount from the frontend
    const { email, amount } = req.body

    try {
        // log the email, amount and the paystack secret key for debugging purposes
        console.log(email, amount, process.env.PAYSTACK_SECRET_KEY)
        
        // make a post request to paystack to initialize the payment
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize', // endpoint that creates tha payment in paystack
            // send the email and amount from the client to the paystack server
            {
                email,
                amount: amount * 100 // Nigerian Naira MUST BE IN KOBO
            },
            {
                // Tell paystack that the paymetn is coming from you
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        // paystack responds with the authorization_url (The link used to pay that will open in the frontend)
        // and the reference (a unique id for the payment transaction)
        res.status(200).json({
            authorization_url: response.data.data.authorization_url,
            reference: response.data.data.reference
        })

    } catch (err) {
        console.error('PAYMENT ERROR: Error initiating payment')
        res.status(500).json({ message: "Payment Initialization: Internal server Error." })
    }
}

// function to verify payments using the reference
const verifyPayment = async (req, res) => {

    // get the payment reference from the request parameter from the frontend
    const { reference } = req.params

    try {
        // get the response from paystack
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        )

        // Check if paystacks response was that It was successful
        if (response.data.data.status === 'success') {
            console.log(response.data.data.status)
            console.error('Payment verification successful.')
            return res.status(200).json({ message: 'Payment verified successfully', data: response.data.data })
        } else {
            console.log(response.data.data.status)
            console.error('Error verifying payments.')
            res.status(500).json({ message: 'Payment verification: Error verifying payments.' })
        }


    } catch (err) {
        console.error('Error verifying payment: ', err)
        return res.status(500).json({ 
            message: "BACKEND: Error verifying payment", 
            error: err.message
        })
    }
}



// export the function
module.exports = { initiatePayment, verifyPayment }