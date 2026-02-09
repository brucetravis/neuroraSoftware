import React from 'react'
import './Services.css'
import { Cpu, Monitor, Settings, Smartphone, Zap } from 'lucide-react'
import ServiceCard from '../../../../components/cards/servicecard/ServiceCard'
import { useInView, useSpring, animated, useTrail } from '@react-spring/web'

export default function Services() {

  const [ ref, inView ] = useInView({ triggerOnce: true, threshold: 0.2 })

  // an array of services
  const services = [
    { icon: <Monitor size={32} color="#c87cff" />, title: 'Web Development', description: 'Responsive websites, custom interfaces, and e-commerce solutions integrated with AI.' },
    { icon: <Smartphone size={32} color="#c87cff" />, title: 'Smart Mobile Apps', description: 'Feature-rich smart mobile apps for iOS and Android platforms integrated with AI.' },
    { icon: <Cpu size={32} color="#c87cff" />, title: 'Machine Learning Tools', description: 'AI-powered predictive and analytics solutions.' },
    { icon: <Settings size={32} color="#c87cff" />, title: 'Automation Solutions', description: 'Streamline business processes with intelligent automation.' },
    { icon: <Zap size={32} color="#c87cff" />, title: 'AI Subscriptions & Rentals', description: 'Pay-as-you-go AI tools and services for businesses.' },
  ]

  // Animate heading + lead text
  const textSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 },
  });

  // Animate service cards with stagger
  const trail = useTrail(services.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { mass: 1, tension: 280, friction: 20 },
  });

  return (
    <section
      className="services-hero" aria-labelledby='services-title' ref={ref}
    >
      <animated.h4 style={textSpring} className='services-kicker'>
        WHAT WE OFFER
      </animated.h4>
      
      <div
        className="section-inner"
      >
        <animated.h2 style={textSpring} className='services-heading' id="services-title">
          Intelligent Solutions for Your Business
        </animated.h2>

        <animated.p style={textSpring} className='services-lead'>
          We provide AI-powered software and smart digital solutions that help businesses scale effortlessly, streamline workflows, and achieve measurable growth.
        </animated.p>

        <div className='services-grid'>
          {trail.map((props, index) => (
            <animated.div style={props} key={index}>
              <ServiceCard 
                icon={services[index].icon}
                title={services[index].title}
                description={services[index].description}
              />
            </animated.div>
          ))}
        </div>
      </div>

    </section>
  )
}
