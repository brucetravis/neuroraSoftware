import React, { useState } from 'react'
import './CustomQuoteModal.css'
import { usePricing } from '../../../contexts/PricingProvider'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../../configs/firebase'

export default function CustomQuoteModal() {

    const [ activeEntity, setActiveEntity ] = useState(null)

    const [ showPurchaseSection, setShowPurchaseSection ] = useState(false)

    // state to show the form submission
    const [ isSubmit, setIsSubmit ] = useState(false) // initial state is false meaning no current submisison

    // get the state to render the quotation modal
    const { selectedPlan, openQuotationModal, setOpenQuotationModal } = usePricing()

    // state to store userData
    const [ userData, setUserData ] = useState({
        entity_type: "",
        software_type: "",
        clientName: "",
        businessName: "",
        enterpriseName: "",
        organizationName: "",
        domain_name: "",
        maintenance: "",
        quotationNumber: '',
        currency: ''
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
        setOpenQuotationModal(false)
    }

    // function to submit the data to firebase and handle te payment integration
    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsSubmit(true)

        if (!selectedPlan) {
            toast.warning("Please select a plan first.")
            setIsSubmit(false)
            return null
        }

        try {
            // create a reference to the collection according to the entity the user chooses
            const collectionRef = collection(db, userData.entity_type)

            // Pick the correct name based on the entity type
            let nameField = ''
            // Pick the name title based on the entity type
            let name_title = ''

            switch(userData.entity_type) {
                case 'personal':
                    nameField = userData.clientName
                    name_title = 'clientName'
                    break

                case 'business':
                    nameField = userData.businessName
                    name_title = 'businessName'
                    break

                case 'enterprise':
                    nameField = userData.enterpriseName
                    name_title = 'enterpriseName'
                    break

                case 'organization':
                    nameField = userData.organizationName
                    name_title = 'organizationName'
                    break

                default:
                    nameField = 'Not Provided'
                    name_title = 'Not Provided'
            }

            // build the document to send
            const dataToSend = {
                entityType: userData.entity_type,
                softwareType: userData.software_type,
                domainName: userData.domain_name,
                maintenance: userData.maintenance,
                [name_title]: nameField,
                plan: selectedPlan.name,
                quotationCurrency: userData.currency,
                quotationNumber: userData.quotationNumber
            }

            await addDoc(collectionRef, dataToSend)

            toast.success('Product successfully purchased.')
            setIsSubmit(false)

            // reload the page
            window.location.reload()

        } catch (err) {
            console.error('Error sending data to firestore: ', err)
            toast.error('Error making the payment.')
        }
    }

    return (
        <section className='quotation-modal-overlay'>
            {openQuotationModal && (
                <form 
                    className='custom-modal'
                    onSubmit={handleSubmit}
                >
                    <h2>Quotation Sheet</h2>

                    <div className='client-questionnaire'>
                        <div className='owner_type'>
                            <h3>Type of entity?</h3>

                            <div className='entity-section'>
                                <label>
                                    <input 
                                        type='radio'
                                        name='entity_type'
                                        value='personal'
                                        onChange={(e) => {
                                            handleChange(e)
                                            setActiveEntity('personal')
                                        }}
                                        required
                                    />
                                    Personal
                                </label>

                                <label>
                                    <input
                                        type='radio'
                                        name='entity_type'
                                        value='business'
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
                                        onChange={(e) => {
                                            handleChange(e)
                                            setActiveEntity('organization')
                                        }}
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

                        <div className='software_type'>
                            <h3>Type of Software to purchase?</h3>

                            <div className='software-section'>
                                <label>
                                    <input 
                                        type='radio'
                                        name='software_type'
                                        value='website'
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
                                        onChange={handleChange}
                                    />
                                    App
                                </label>

                                <label>
                                    <input
                                        type='radio'
                                        name='software_type'
                                        value='enterprise'
                                        onChange={handleChange}
                                    />
                                    system
                                </label>

                                <label>
                                    <input
                                        type='radio'
                                        name='software_type'
                                        value='AI agent'
                                        onChange={handleChange}
                                    />
                                    AI agent
                                </label>
                            </div>
                        </div>
                        <br/>

                        <div className='domain_name'>
                            <h3>Do you have a domain name?</h3>

                            <label>
                                <input 
                                    type='radio'
                                    name='domain_name'
                                    value='Yes'
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </label>

                            <label>
                                <input 
                                    type='radio'
                                    name='domain_name'
                                    value='No'
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>

                        <div className='maintenance'>
                            <h3>Do you need ongoing software maintenance?</h3>

                            <label>
                                <input 
                                    type='radio'
                                    name='maintenance'
                                    value='yes'
                                    onChange={(e) => {
                                        handleChange(e)
                                        setShowPurchaseSection(true)
                                    }}
                                />
                                Yes
                            </label>

                            <label>
                                <input 
                                    type='radio'
                                    name='maintenance'
                                    value='no'
                                    onChange={(e) => {
                                        handleChange(e)
                                        setShowPurchaseSection(true)
                                    }}
                                />
                                No
                            </label>
                        </div>
                        <br/>

                        {showPurchaseSection && (
                            <div 
                                className='budget-div'
                            >
                                <h4>What is your Budget?</h4>

                                <div className='prices'>
                                    <select
                                        name='currency'
                                        value={userData.currency}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value='' default>Select currency</option>
                                        <option value='usd'>USD</option>
                                        <option value='eur'>EUR</option>
                                        <option value='kes'>KES</option>
                                    </select>

                                    <input 
                                        type='number'
                                        placeholder='300000'
                                        name='quotationNumber'
                                        className='quotation-number'
                                        value={userData.quotationNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='quotation-buttons'>
                                    <button
                                        type='submit'
                                        className='submit-quotation'
                                    >
                                        { isSubmit ? 'Purchasing...' : "Purchase" }
                                    </button>

                                    <button
                                        className='cancel-quotation'
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            )}
        </section>
    )
}
