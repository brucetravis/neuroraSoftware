import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

// create the pricing Provider context
const PricingContext = createContext()

// create a custom hook to use the pricing context
export const usePricing = () => useContext(PricingContext)


export default function PricingProvider({ children }) {

    // state to open and close the modal
    const [ openStandardModal, setOpenStandardModal ] = useState(false)
    const [ openQuotationModal, setOpenQuotationModal ] = useState(false)
    const [ selectedPlan, setSelectedPlan ] = useState(null)
    const [currency, setCurrency] = useState('USD');

    // // state to control the email
    const [ email, setEmail ] = useState('')
    // state to control the amount
    const [ amount, setAmount ] = useState(0)

    const EUR_RATE = 0.92;
    const KES_RATE = 130;

    const format = (usd) => {
        if (!usd) return '';
        if (currency === 'USD') return `$${usd.toLocaleString()}`;
        if (currency === 'EUR') return `€${Math.round(usd * EUR_RATE).toLocaleString()}`;
        return `KSh ${Math.round(usd * KES_RATE).toLocaleString()}`;
    };


    // function to handle payaments
    const handlePayment = async () => {
        
        // check if emaila and amount exist
        if (!email || amount <= 0)
            // return a message and exit the function
            return toast.error('Amount MUST be greater than 0 and email MUST be provided.'
        )

        try {
            // initiate the payment by calling the payment
            const respose = await axios.post('http://localhost:5000/paymentAPI/initPayment', { email, amount})

            // destructure the respose to get the authorization_url (link used to pay) and the reference (unique id for the payment)
            const { authorization_url, reference} = respose.data

            // store the reference in localStorage
            localStorage.setItem('payment_reference', reference)

            // open the link to where the user is supposed to pay
            window.location.href = authorization_url

            // return the reference to the backend to verify if the payment was successful
            return reference

        } catch (err) {
            console.error('Frontend Payment Error: ', err)
            toast.error('Payment Failed. Please try again.')
        }
    }

   // verify payments using the reference
const verifyPayment = async () => {
    try {
        const reference = localStorage.getItem('payment_reference')

        if (!reference) {
            console.error('No payment reference found.')
            return toast.error('No payment reference found')
        }

        // CHANGED: POST to GET
        const paymentResult = await axios.get(`http://localhost:5000/paymentAPI/verifyPayment/${reference}`)

        if (paymentResult.data.data.status === 'success') {
            localStorage.removeItem('payment_reference')
            toast.success('Payment verified successfully.')
            return true
        } else {
            toast.error('Payment verification Failed.')
            return false
        }

    } catch (err) {
        console.error('Payment verification failed: ', err)
        toast.error('Payment verification failed. Please contact support.')
        throw err
    }
}


    useEffect(() => {
        if (selectedPlan) {
            const kesAmount = Math.round(selectedPlan.usd * KES_RATE)
            setAmount(kesAmount)
        }

    }, [selectedPlan])


    return (
        <PricingContext.Provider
            value={{
                openStandardModal, setOpenStandardModal,
                openQuotationModal, setOpenQuotationModal,
                selectedPlan, setSelectedPlan, currency, 
                setCurrency, verifyPayment, handlePayment,
                format, email, setEmail, amount, setAmount
            }}
        >
            {children}
        </PricingContext.Provider>
    )
}