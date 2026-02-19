import React from 'react'
import './SwCards.css'
import { usePricing } from '../../../contexts/PricingProvider'

export default function SwCards({ title, amount, features }) {
    // get the format function from the pricing provider
    const { format } = usePricing()

  return (
    <div className='sw-card-body'>
        <h4 className='card-title'>{title}</h4>

        <div className='price'>
            <span className='price-amount'>{format(amount)}</span>
            <span className='price-note'>Starting From</span>
        </div>
        
        <ul className='features'>
            {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
            ))}
        </ul>
    </div>
  )
}
