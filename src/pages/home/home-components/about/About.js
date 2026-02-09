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
    transform: inView ? 'translateY(0px)' : 'translateY(12px)',
    config: { tension: 200, friction: 22 },
    delay: 400
  });


  const imageSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0px)' : 'translateX(-30px)',
    // transform: inView ? 'transformX(0px)' : 'transformX(-30px)',
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
            Neurora is a <strong>software development company</strong> that develops <strong>smart software</strong> tailored 
            to your business needs. At Neurora, we create <stong>AI-powered software solutions</stong> and intelligent
            digital tools that help businesses scale effortlessly, streamline workflows, and achieve measurable growth.
            From intuitive websites and feature-rich mobile apps to advanced machine learning tools, tailored automation, 
            and AI solutions available for subscription or rental, we design technology that streamlines workflows, boosts 
            efficiency, and drives measurable growth. We empower startups, SMEs, and enterprises to turn ideas 
            into results, optimize operations, and transform visitors into loyal customers.
          </animated.p>
        </div>

      </div>
    </section>
  )
}
