import React from 'react'
import './Software.css'
import { Settings, Monitor, Smartphone, Cpu, Zap } from 'lucide-react'
import ServiceCard from '../../../../components/cards/servicecard/ServiceCard'
import { useInView, useSpring, animated, useTrail } from '@react-spring/web'

export default function Software() {

  const [ ref, inView ] = useInView({ triggerOnce: true, threshold: 0.2 })

    // an array of software
    // an array of services
    const software = [
      { 
        icon: <Monitor size={32} color="#c87cff" />, 
        title: 'Web Development', 
        description: 'Responsive websites, custom interfaces, and e-commerce solutions integrated with AI.',
        price: 'FROM KES 35,000'
      },
      { 
        icon: <Smartphone size={32} color="#c87cff" />, 
        title: 'Smart Mobile Apps', 
        description: 'Feature-rich smart mobile apps for iOS and Android platforms integrated with AI.',
        price: 'FROM KES 120,000' 
      },

      { 
        icon: <Cpu size={32} 
        color="#c87cff" />, 
        title: 'Machine Learning Tools', 
        description: 'AI-powered predictive and analytics solutions.',
        price: 'FROM KES 200,000'
      },
      { 
        icon: <Settings 
        size={32} 
        color="#c87cff" />, 
        title: 'Automation Solutions', 
        description: 'Streamline business processes with intelligent automation.',
        price: 'FROM KES 50,000'
      },
      { 
        icon: <Zap size={32} 
        color="#c87cff" />, 
        title: 'AI Subscriptions & Rentals', 
        description: 'Pay-as-you-go AI tools and services for businesses.',
        price: 'FROM KES 3,000'
      },
    ]

    // Animate heading + lead text
    const textSpring1 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0px)' : 'translateX(-50px)', // from the left
        config: { tension: 200, friction: 20 },
    });

    const textSpring2 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0px)' : 'translateX(50px)', //from the right
        config: { tension: 200, friction: 20 },
    });

    const textSpring3 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(-50px)' : 'translateY(-50px)', // from the left
        config: { tension: 200, friction: 20 },
    });

    // Animate service cards with stagger
    const trail = useTrail(software.length, {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(20px)',
        config: { mass: 1, tension: 280, friction: 20 },
    });

  return (
    <section
      className="software-hero" aria-labelledby='software-title' ref={ref}
    >
      <animated.h4 style={textSpring1} className='software-kicker'>
        SMART SOLUTIONS
      </animated.h4>
      
      <div
        className="section-inner"
      >
        <animated.h2 style={textSpring2} className='software-heading' id="software-title">
          Intelligent Solutions for Your African Businesses
        </animated.h2>

        <animated.p style={textSpring3} className='software-lead'>
            We provide AI-powered software and smart digital solutions that help African businesses scale effortlessly, streamline workflows, and achieve measurable growth.
        </animated.p>

        <div className='software-grid'>
            {trail.map((props, index) => (
                <animated.div style={props} key={index}>
                    <ServiceCard 
                      icon={software[index].icon}
                      title={software[index].title}
                      description={software[index].description}
                      prices={software[index].price}
                    />
                </animated.div>
            ))}
        </div>
      </div>

    </section>
  )
}
