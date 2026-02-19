import React from 'react'
import './AiCard.css'
import { usePricing } from '../../../contexts/PricingProvider'

export default function AiCard({ title, amount, features }) {
    // get the format fro the pricing provider
    const { format } = usePricing()

  return (
    <div className='ai-card-body'>
        <h4 className='card-ttile'>{title}</h4>

        <div className='price'>
            <span className='price-amount'>{format(amount)}</span>
            <span className='price-note'>Starting from</span>
        </div>
        
        <ul className='features'>
            {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
            ))}
        </ul>
    </div>
  )
}
