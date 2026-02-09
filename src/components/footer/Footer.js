import React from 'react'
import './Footer.css'
import { FaInstagram, FaLinkedin, FaFacebookF, FaXTwitter } from 'react-icons/fa6'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">

            <div className="footer-brand">
                <h1>Neurora</h1>
                <p>Building intelligent solutions for a smarter future.</p>
            </div>

            <div
                className='contacts-div'
            >
                <h3>Contact Us</h3>
                
                <div
                    className='contacts-div-content'
                >
                    <div
                        className='email'
                    >
                        <Mail size={25} stroke='#c87cff' />
                        <span>Email: neurora4@gmail.com</span>
                    </div>

                    <div
                        className='phone'
                    >
                        <Phone size={25} stroke='#c87cff' />
                        <span>Phone: +254 (079) 376-4742</span>
                    </div>
                </div>

            </div>

            <div className="footer-social">
                <FaInstagram 
                    onClick={() => window.open('https://www.instagram.com/')}
                />

                <FaLinkedin 
                    onClick={() => window.open('https://www.linkedin.com/feed/')}
                />

                <FaXTwitter 
                    onClick={() => window.open('https://x.com/')}
                />

                <FaFacebookF />
            </div>
        </div>
        
        <div className="footer-bottom">
            © 2024 Neurora. All rights reserved.
        </div>
    </footer>
  )
}
