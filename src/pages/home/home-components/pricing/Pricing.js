import React, { useEffect, useState } from 'react';
import './Pricing.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, useSprings, animated } from '@react-spring/web';
import { usePricing } from '../../../../contexts/PricingProvider';
import { aiPlans, swPlans } from '../../../../data/Pricing';


export default function Pricing() {
    const [ref, inView] = useInView({ threshold: 0.2 });
    const [hasAnimated, setHasAnimated] = useState(false);

    const shouldRender = inView || hasAnimated;

    // get the necessary functions from the pricing provider
    const { setSelectedPlan, setOpenStandardModal, setOpenQuotationModal,
            currency, setCurrency, format
        } = usePricing();

        
    const sectionSpring = useSpring({
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? 'translateY(0px)' : 'translateY(40px)',
        config: { tension: 180, friction: 26 },
    });

    const aiSprings = useSprings(
        aiPlans.length,
        aiPlans.map((_, i) => ({
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated
            ? 'translate3d(0px, 0px, 0)'
            : `translate3d(${i % 2 === 0 ? -30 : 30}px, 40px, 0)`,
            delay: hasAnimated ? i * 100 + 300 : 0,
            config: { tension: 180, friction: 24 },
        }))
    );



    const swSprings = useSprings(
        swPlans.length,
        swPlans.map((_, i) => ({
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated
            ? 'translate3d(0px, 0px, 0)'
            : `translate3d(${i % 2 === 0 ? -30 : 30}px, 40px, 0)`,
            delay: hasAnimated ? i * 100 + 600 : 0,
            config: { tension: 180, friction: 24 },
        }))
    );



    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    // const EUR_RATE = 0.92;
    // const KES_RATE = 130;

    // const format = (usd) => {
    //     if (!usd) return '$0';
    //     if (currency === 'USD') return `$${usd.toLocaleString()}`;
    //     if (currency === 'EUR') return `€${Math.round(usd * EUR_RATE).toLocaleString()}`;
    //     return `KSh ${Math.round(usd * KES_RATE).toLocaleString()}`;
    // };


    // function to handle the plans
    const handleStandardPlans = (plan) => {
        setSelectedPlan(plan);
        setOpenStandardModal(true);
    }

    // function to handle the plans
    const handleQuotationPlans = (plan) => {
        setSelectedPlan(plan);
        setOpenQuotationModal(true)
    }

    return (
        <section className="pricing-section" ref={ref}>
            {shouldRender && (
                <animated.div style={sectionSpring} className='pricing-inner'>
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
                </animated.div>
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
                            {aiPlans.map((plan, i) => (
                                <animated.article 
                                    key={plan.id}
                                    style={aiSprings[i]}
                                    className={`card card-ai ${plan.tag ? 'card-tagged' : ''}`}
                                >
                                    {plan.tag && <div className="badge">{plan.tag}</div>}

                                    {/* <div className="card-3d">
                                        {/* Placeholder for future 3D or animated content
                                        <div className="card-3d-placeholder"></div>
                                    </div> */}

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
                                        <div className="card-cta">
                                            <button 
                                                className={`btn primary ${i === 1 ? 'btn-ghost' : ''}`}
                                                onClick={() => handleStandardPlans(plan)}
                                            >
                                                Get started
                                            </button>
                                            
                                            <button 
                                                className="btn subtle"
                                                onClick={() => handleQuotationPlans(plan)}
                                            >
                                                Request Quote
                                            </button>
                                        </div>
                                    </div>
                                </animated.article>
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
                        {swPlans.map((plan, i) => (
                            <animated.article 
                                key={plan.id}
                                style={swSprings[i]}
                                className={`card card-sw ${plan.tag ? 'card-tagged' : ''}`}
                            >
                            {plan.tag && <div className="badge">{plan.tag}</div>}

                            {/* <div className="card-3d small">
                                <div className="card-3d-placeholder"></div>
                            </div> */}

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
                                {/* <div className="card-cta">
                                    <button 
                                        className="btn primary"
                                        onClick={() => handleStandardPlans(plan) }
                                    >
                                        Get started
                                    </button>
                                    <button 
                                        className="btn subtle"
                                        onClick={() => handleQuotationPlans(plan) }
                                    >
                                        Request quote
                                    </button>
                                </div> */}
                            </div>
                            </animated.article>
                        ))}
                        </div>
                    </div>  
                </>
            )}
        </section>
    );
}