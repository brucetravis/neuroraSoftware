import React, { useState } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser'

export default function Contact() {

  // state to handle the form data
  const [ formData, setFormData ] = useState({
    firstName: '',
    secondName: '',
    subject: '',
    senderEmail: '',
    message: ''
  })

  // state to verify the the sending status
  const [ sending, setSending ] = useState(false)

  // function to handle the form submission
  const handleSubmit = (e) => {

    // prevent teh default form behaviour
    e.preventDefault()
    // update the sending status to true
    setSending(true)
    
    emailjs.send(
      // service Id
      'service_p7fzo3q',
      // Template Id
      'template_oqcyd5r',
      
      // formData to be sent
      {
        name: `${formData.firstName} ${formData.secondName}`,
        email: formData.senderEmail,
        title: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString()
      },

      // Public key
      'O0STyIcfeShQR2Ucu'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Message sent!')
      // reset the form data
      setFormData({
        firstName: '', 
        secondName: '', 
        senderEmail: '', 
        subject: '', 
        message: '' 
      })
      
      // update the sending status to false
      setSending(false)
    
    }, (error) => {
      console.log('FAILED...', error);
      alert('Message failed to send. Please try again.')
      // update the sending status to false
      setSending(false)
    })
  }

  // function to handle the change in the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="contact-section">
      <div className="contact-content">
        
        <h4 className="contact-kicker">Contact Us</h4>
        <h2 className="contact-heading">Help Us Help You</h2>
        <p className="contact-subtext">
          Tell us what you need — our team will respond within 24 hours.
        </p>

        <form 
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="row">
            <div className="field">
              <label>First Name</label>
              <input 
                type="text" 
                placeholder="Enter your first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Second Name</label>
              <input 
                type="text" 
                placeholder="Enter your second name"
                name="secondName"
                value={formData.secondName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Subject</label>
            <input 
              type="text" 
              placeholder="Subject of your message"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Your Message</label>
            <textarea 
              placeholder="Write your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type='submit' className="contact-btn">
            {sending ? 'Sending...' : 'Send Message'}
          </button>

        </form>
      </div>
    </section>
  )
}
