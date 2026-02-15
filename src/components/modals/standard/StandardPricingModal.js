import React, { useEffect, useState } from 'react'
import './StandardPricingModal.css'
// import { useParams } from 'react-router-dom'
import { usePricing } from '../../../contexts/PricingProvider'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../configs/firebase'
import { toast } from 'react-toastify'

export default function StandardPricingModal({ aiPlans, swPlans }) {
  
  const [ activeEntity, setActiveEntity ] = useState(null)
  const [ showPurchaseSection, setShowPurchaseSection ] = useState(false)

  // state to show the form submission
  const [ isSubmit, setIsSubmit ] = useState(false) // initial state is false meaning no current submisison

  // state to store userData
  const [ userData, setUserData ] = useState({
    entity_type: "",
    software_type: "",
    clientName: "",
    businessName: "",
    enterpriseName: "",
    organizationName: "",
    domain_name: "",
    maintenance: ""
  })

  // function to handle the change in the input
  const handleChange = (e) => {

    // extract the name and the value from the browser
    const { name, value } = e.target

    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  // funtion to close teh module
  const handleCancel = () => {
    window.location.reload()
    setOpenStandardModal(false)
  }

  // Get the states from the context
  const { selectedPlan, openStandardModal, setOpenStandardModal,
    email, amount, setEmail, handlePayment, verifyPayment, format
  } = usePricing();

  // if (!selectedPlan) return null; // safety check

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmit(true)

    try {
      // 1. Save user data BEFORE redirect
      localStorage.setItem(
        'pending_purchase',
        JSON.stringify({
          userData,
          selectedPlan
        })
      )

      // 2. Start payment (this will redirect)
      await handlePayment() // redirects to Paystack
      // nothing after this runs until user returns

    } catch (err) {
      console.error(err)
      // toast.error('Something went wrong')
      setIsSubmit(false)
    }
  }

  // -----------------------------
  // USE EFFECT: AFTER RETURN FROM PAYSTACK
  // -----------------------------
  useEffect(() => {
    const completePurchase = async () => {
        const pending = localStorage.getItem('pending_purchase');
        const paymentReference = localStorage.getItem('payment_reference');
        
        // DEBUG
        console.log('Checking for pending purchase...')
        console.log('Pending data:', pending ? 'EXISTS' : 'NONE')
        console.log('Payment reference:', paymentReference || 'NONE')

        if (!pending || !paymentReference) {
            console.log('No pending purchase or reference found')
            return;
        }

        const { userData: savedUserData, selectedPlan: savedPlan } = JSON.parse(pending)

        try {
            console.log('Verifying payment...')
            const paymentSuccess = await verifyPayment();
            
            if (!paymentSuccess) {
                toast.error('Payment verification failed. Try again.');
                return;
            }

            console.log('Payment verified! Saving to Firebase...')

            // Save to Firebase
            const collectionRef = collection(db, savedUserData.entity_type)
            let nameField = '', name_title = ''
            
            switch(savedUserData.entity_type) {
                case 'personal':
                    nameField = savedUserData.clientName; name_title = 'clientName'; break
                case 'business':
                    nameField = savedUserData.businessName; name_title = 'businessName'; break
                case 'enterprise':
                    nameField = savedUserData.enterpriseName; name_title = 'enterpriseName'; break
                case 'organization':
                    nameField = savedUserData.organizationName; name_title = 'organizationName'; break
                default:
                    nameField = 'Not Provided'; name_title = 'Not Provided';
            }

            const dataToSend = {
                entityType: savedUserData.entity_type,
                softwareType: savedUserData.software_type,
                domainName: savedUserData.domain_name,
                maintenance: savedUserData.maintenance,
                [name_title]: nameField,
                plan: savedPlan.name,
                charges: savedPlan.usd,
                paymentReference,
                paymentStatus: 'success'
            }

            await addDoc(collectionRef, dataToSend)
            toast.success('Purchase completed successfully!')

            // Clean up
            localStorage.removeItem('pending_purchase')
            localStorage.removeItem('payment_reference')
            setOpenStandardModal(false)
            window.location.reload()

        } catch (err) {
            console.error('Error completing purchase:', err)
            toast.error('Error completing purchase. Contact support.')
        }
    }

    completePurchase()

}, [verifyPayment, setOpenStandardModal])
  

  return (
    <section
      className='modal-overlay'
    >
      {openStandardModal && (
        <form
          className="standard-modal"
          onSubmit={handleSubmit}
        >
          <h2>checkout</h2>
          
          
          <div
            className='client-questionnaire'
          >
            <div
              className='owner_type'
            >
              <h3>Type of entity?</h3>

              <div
                className='entity-section'
              >
                <label>
                  <input 
                    type='radio'
                    name='entity_type'
                    value='personal'
                    checked={userData.entity_type === 'personal'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('personal')
                    }}
                  />

                  Personal
                </label>
                
                <label>
                  <input
                    type='radio'
                    name='entity_type'
                    value='business'
                    checked={userData.entity_type === 'business'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('business')
                    }}
                  />

                  Business
                </label>

                <label>
                  <input
                    type='radio'
                    name='entity_type'
                    value='enterprise'
                    checked={userData.entity_type === 'enterprise'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('enterprise')
                    }}
                  />

                  Enterprise
                </label>

                <label>
                  <input
                    type='radio'
                    name='entity_type'
                    value='organization'
                    checked={userData.entity_type === 'organization'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('organization')
                    }}
                    required
                  />

                  Organization
                </label>

              </div>
            </div>

            {activeEntity === 'personal' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Names of Client</label>
                <input
                  type='text'
                  name='clientName'
                  placeholder='John Doe'
                  value={userData.clientName.toUpperCase()}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {activeEntity === 'business' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Name of Business:</label>
                <input
                  type='text'
                  name='businessName'
                  placeholder='Mbao hardware'
                  value={userData.businessName.toUpperCase()}
                  
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {activeEntity === 'enterprise' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Name of Enterprise</label>
                <input
                  type='text'
                  name='enterpriseName'
                  placeholder='Garage motors'
                  value={userData.enterpriseName.toUpperCase()}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {activeEntity === 'organization' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Name of Organization</label>
                <input
                  type='text'
                  name='organizationName'
                  placeholder='KOPRA'
                  value={userData.organizationName.toUpperCase()}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div
              className='software_type'
            >
              <h3>Type of Software to purchase?</h3>

              <div
                className='software-section'
              >
                <label>
                  <input 
                    type='radio'
                    name='software_type'
                    value='website'
                    checked={userData.software_type === "website"} // controlled
                    onChange={handleChange}
                    required
                  />

                  Website
                </label>
                
                <label>
                  <input
                    type='radio'
                    name='software_type'
                    value='app'
                    checked={userData.software_type === "app"} // controlled
                    onChange={handleChange}
                  />

                  App
                </label>

                <label>
                  <input
                    type='radio'
                    name='software_type'
                    value='enterprise'
                    checked={userData.software_type === "enterprise"} // controlled
                    onChange={handleChange}
                  />

                  system
                </label>

                <label>
                  <input
                    type='radio'
                    name='software_type'
                    value='AI agent'
                    checked={userData.software_type === "AI agent"} // controlled
                    onChange={handleChange}
                  />
                  
                  AI agent
                </label>
              </div>
            </div><br/>
            
            
            <div
              className='domain_name'
            >
              <h3>Do you have a domain name?</h3>

              <label>
                <input 
                  type='radio'
                  name='domain_name'
                  value='yes'
                  checked={userData.domain_name === 'yes'}
                  onChange={handleChange}
                  required
                />

                Yes
              </label>

              <label>
                <input 
                  type='radio'
                  name='domain_name'
                  value='no'
                  checked={userData.domain_name === 'no'}
                  onChange={handleChange}
                />

                No
              </label>

            </div>


            <div
              className='maintenance'
            >
              <h3>Do you need ongoing software maintenance?</h3>

              <label>
                <input 
                  type='radio'
                  name='maintenance'
                  value='yes'
                  checked={userData.maintenance === 'yes'}
                  onChange={(e) => {
                    handleChange(e)
                    setShowPurchaseSection(true)
                  }}
                  required
                />

                Yes
              </label>

              <label>
                <input 
                  type='radio'
                  name='maintenance'
                  value='no'
                  checked={userData.maintenance === 'no'}
                  onChange={(e) => {
                    handleChange(e)
                    setShowPurchaseSection(true)
                  }}
                />

                No
              </label>

            </div>

          </div><br/>

          <div 
            className='schedule_meeting'
          >
            <h3>Schedule a meeting with us </h3>
            
            <a
              href="https://calendly.com/neurora4/30min"
              target="_blank"
              rel='noreferrer'
              className='meeting-link'
            >
              Schedule
            </a><br/>
          </div>

          {showPurchaseSection && (
            <div
              className='billing'
            >
              <div>
                <h4>You are about to purchase our <strong>{selectedPlan.name}</strong> Plan</h4>
                <p className='cost'>Pay <strong>{format(selectedPlan.usd)}</strong> for this service</p>
              </div>

              <div
                className='billing-info'
              >
                <div
                  className='d-flex align-items-start flex-column gap-2'
                >
                  <label htmlFor='email'>Email: </label>

                  <input 
                    type='email'
                    placeholder='johndoe@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div
                  className='d-flex align-items-start flex-column gap-2'
                >
                  <label htmlFor='amount'>Price in KES: </label>

                  <input 
                    type='number'
                    value={amount}
                    disabled
                  />
                </div>

              </div>

              <div className='payment-buttons'>
                <button
                  type='submit'
                  className='purchase-button'
                >
                  { isSubmit ? 'Purchasing....' : 'Purchase' }
                </button>

                <button
                  className='cancel-button'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </form>
      )}
    </section>
  )
}
