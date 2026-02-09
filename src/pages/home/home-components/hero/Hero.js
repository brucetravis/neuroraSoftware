import React, { useEffect, useState } from 'react';
import './Hero.css';
import { useSpring, animated } from '@react-spring/web';
import StarField from '../../../../components/starfield/StarField';

export default function Hero() {

  // function for the hero title spring
  const heroTitleSpring= useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 20 },
  })

  // function for the text
  const heroTextSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    delay: 250, //staggered paragraph comes slightly after the heading
    config: { tension: 200, friction: 20 }
  })

  // state to control what happends when we hover over the stars
  const [ mousePos, setMousePos ] = useState({ x: 0.5, y: 0.5 })

  // track the mouse movement
  useEffect(() => {
    
    // function to control the mouse hovering
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientX / window.innerHeight;
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)

  }, []) // empty dependency array


  return (
    <section className="hero">
      <div className="overlay"></div>

      <StarField count={500} mousePos={mousePos} /> {/* Dynamic stars */}
      
      <div className="hero-content">

        <animated.h3 style={heroTitleSpring}>
          Welcome to Neurora
        </animated.h3>
        
        <animated.h1 style={heroTitleSpring}>
          Empowering the Future with <span className="highlight">AI-Powered Software Solutions</span>
        </animated.h1>

        <animated.p style={heroTextSpring}>
          At Neurora, we create <strong className='highlight'>intelligent software</strong> and smart digital tools
          that help businesses scale effortlessly, streamline workflows, and achieve measurable growth.
        </animated.p>

      </div>
    </section>
  );
}
