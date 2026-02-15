import React, { useEffect, useState } from 'react';
import './Pricing.css';
import { useInView } from 'react-intersection-observer';
import { aiPlans, swPlans } from '../../../../data/Pricing';
import { usePricing } from '../../../../contexts/PricingProvider';

export default function Pricing() {
    const [ref, inView] = useInView({ 
        threshold: 0.2,
        rootMargin: "-80px 0px -20% 0px"
    });
    const [hasAnimated, setHasAnimated] = useState(false);

    const shouldRender = inView || hasAnimated;

    // get the necessary functions from the pricing provider
    const { setSelectedPlan, setOpenStandardModal, setOpenQuotationModal,
            currency, setCurrency, format
        } = usePricing();

    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    return (
        <section className="pricing-section" ref={ref}>
            {shouldRender && (
                <div className='pricing-inner'>
                    <div className="pricing-inner">
                        <h4 className="pricing-kicker">Pricing Plans</h4>
                        <h2 className="pricing-heading">EXPLORE OUR AFFORDABLE AI AND SMART SOFTWARE PLANS</h2>

                        <div className="currency-toggle">
                        <div className="toggle-label">Currency</div>
                        <div className="toggle-buttons" role="tablist" aria-label="Currency switch">
                            {['USD', 'EUR', 'KES'].map((c) => (
                                <button
                                    key={c}
                                    className={`toggle-btn ${currency === c ? 'active' : ''}`}
                                    onClick={() => setCurrency(c)}
                                    aria-pressed={currency === c}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            )}

            {shouldRender && (
                <>
                    {/* AI Services */}
                    <div className="section-block ai-block">
                        <div className="section-header">
                        <h3 className="section-title">AI-Powered Software Solutions</h3>
                        <p className="section-sub">
                            Websites | smart mobile apps | **AI-integrated systems** designed to boost efficiency.
                        </p>
                        </div>

                        <div className="cards-grid">
                            {aiPlans.map((plan) => (
                                <article 
                                    key={plan.id}
                                    className={`card card-ai ${plan.tag ? 'card-tagged' : ''}`}
                                >
                                    {plan.tag && <div className="badge">{plan.tag}</div>}

                                    <div className="card-body">
                                        <h4 className="card-title">{plan.name}</h4>
                                        <div className="price">
                                            <span className="price-amount">{format(plan.usd)}</span>
                                            <span className="price-note">Starting from</span>
                                        </div>
                                        <ul className="features">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {shouldRender && (
                <>
                    {/* Software Services */}
                    <div className="section-block sw-block">
                        <div className="section-header">
                        <h3 className="section-title">Software (Websites • Apps • Systems)</h3>
                        <p className="section-sub">Reliable, maintainable products — no agents, just rock-solid engineering.</p>
                        </div>

                        <div className="cards-grid">
                        {swPlans.map((plan) => (
                            <article 
                                key={plan.id}
                                className={`card card-sw ${plan.tag ? 'card-tagged' : ''}`}
                            >
                            {plan.tag && <div className="badge">{plan.tag}</div>}

                            <div className="card-body">
                                <h4 className="card-title">{plan.name}</h4>
                                <div className="price">
                                <span className="price-amount">{format(plan.usd)}</span>
                                <span className="price-note">Starting from</span>
                                </div>
                                <ul className="features">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            </article>
                        ))}
                        </div>
                    </div>  
                </>
            )}
        </section>
    );
}
