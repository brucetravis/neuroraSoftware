import React from 'react'
import './About.css'
import RobotGif from '../../../../videos/robot-unscreen.gif'

import { useSpring, animated, useInView } from '@react-spring/web'

export default function About() {

  // states to control the section view
  const [ ref, inView ] = useInView({ triggerOnce: true, threshold: 0.2 })

  // // stagger: title then paragraph
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(12px)',
    config: { tension: 200, friction: 22 },
    delay: 150
  });

  const paraSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)', // slide from the right
    config: { tension: 200, friction: 22 },
    delay: 400
  });


  const imageSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0px)' : 'translateX(-50px)', // slide from the left
    config: { tension: 200, friction: 22 },
    delay: 250
  })

  return (
    <section className="about-hero" aria-labelledby='about-title' ref={ref}>
      
      <animated.h4 style={titleSpring} id="about-title" className="about-kicker">
        ABOUT NEURORA
      </animated.h4>
      
      <div
        className='about-inner container'
      >
        <div 
          className='about-left col-md-6 col-lg-6 col-sm-12'
        >

          <animated.img 
            src={RobotGif} 
            alt="Neurora AI software Illustrution" 
            style={{
              ...imageSpring,
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }} 
          />

        </div>

        <div
          className='about-right col-md-6 col-lg-6 col-sm-12'
        >

          <animated.h2 style={titleSpring} className="about-heading" >
            Scaling Your Business With <span className="accent">Intelligent Software</span>
          </animated.h2>

          <animated.p style={paraSpring} className="about-lead">
            Neurora is a <strong>software development company</strong> that builds intelligent software and <strong>AI-powered solutions</strong> 
            to help <strong className="accent">African businesses</strong> adopt, manage, and optimize AI features. Our platform guides businesses on which AI tools to use, tracks performance, provides actionable insights, and recommends strategic actions to maximize growth and efficiency. 
            From entry-level adoption guidance to subscription management, real-time performance analytics, and strategic growth recommendations, 
            Neurora empowers startups, SMEs, and enterprises to confidently <strong className='accent'>Adopt AI</strong> into their workflows, make data-driven decisions, and achieve measurable results.
          </animated.p>
        </div>

      </div>
    </section>
  )
}
