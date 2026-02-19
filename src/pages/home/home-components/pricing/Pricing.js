import React from 'react'
import './Pricing.css'
// import the packages from teh data folder
import { aiPlans, swPlans } from '../../../../data/Pricing'
import { usePricing } from '../../../../contexts/PricingProvider'
import AiCard from '../../../../components/cards/aicard/AiCard'
import SwCards from '../../../../components/cards/swcards/SwCards'

export default function Pricing() {
    // get the necessary functions from the provider
    const { currency, setCurrency } = usePricing()

  return (
    <section className='pricing-section'>
        <div className='pricing-inner'>
            <div className='pricing-inner'>
                <h4 className='pricing-kicker'>Pricing Plans</h4>
                <h2 className="pricing-heading">EXPLORE OUR AFFORDABLE AI AND SMART SOFTWARE PLANS</h2>
            </div>

            <div className='currency-toggle'>
                <div className='toggle-label'>Currency</div>

                <div className='toggle-buttons' role='tablist' aria-label='currncy switch'>
                    {['USD', 'EUR', 'KES'].map((c) => (
                        <button
                            key={c}
                            className={`toggle-btn ${currency === c ? 'active' : ''}`}
                            onClick={() => setCurrency(c)} // update a specifc currency when It is clicked
                            aria-pressed={currency === c}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className='section-block ai-block'>
            <div className='section-header'>
                <h4 className='section-title'>AI-Powered Software Solutions</h4>
                <p className="section-sub">
                    Websites | smart mobile apps | **AI-integrated systems** designed to boost efficiency.
                </p>
            </div>

            <div className='cards-grid'>
                {aiPlans.map((plan, i) => (
                    <article
                        key={plan.id} 
                        className={`card card-ai ${plan.tag ? 'card-tagged' : ''}`}
                    >
                        {plan.tag && <div className='badge'>{plan.tag}</div>}
                        
                        <AiCard 
                            title={plan.name}
                            amount={plan.usd}
                            features={plan.features}
                        />
                    </article>
                ))}
            </div>
        </div>

        <div className='section-block sw-block'>
            <div className="section-header">
                <h3 className="section-title">Software (Websites • Apps • Systems)</h3>
                <p className="section-sub">Reliable, maintainable products — no agents, just rock-solid engineering.</p>
            </div>


            <div className='cards-grid'>
                {swPlans.map((plan, i) => (
                    <article
                        className={`card card-sw ${plan.tag ? 'card-tagged' : ''}`}
                    >
                        {plan.tag && <div className='badge'>{plan.tag}</div>}

                        <SwCards 
                            title={plan.name}
                            amount={plan.usd}
                            features={plan.features}
                        />
                    
                    </article>
                ))}
            </div>
        </div>
        
    </section>
  )
}