import React, { useEffect, useRef } from 'react'
import './LoadingPage.css'
import { gsap } from 'gsap'

export default function LoadingPage({ onFinish}) {

    // functions to refernce the sphere, text and container
    const sphereRef = useRef(null)
    const textRef = useRef(null)
    const containerRef = useRef(null)


    // useEffect to handle animation effects
    useEffect(() => {

        const tl = gsap.timeline({
            onComplete: () => {
                if (onFinish) onFinish() // inform App.js that loading is done
            }
        })

        // 1. sphere glows for 2 seconds
        tl.to(sphereRef.current, { scale: 1.2, duration: 2, repeat: 1, yoyo: true })

        // 2. Sphere explosion (scale up + fade out)
        tl.to(sphereRef.current, { scale: 5, opacity: 0, duration: 0.8 })

        // 2b. Ensure sphere is hidden (optional for safety)
        tl.set(sphereRef.current, { display: "none" });

        // 3. Show Neurora text with glowing effect
        tl.to(textRef.current, { opacity: 1, scale: 1, duration: 1 })

        // 4. fade out entire loading page
        tl.to(containerRef.current, { opacity: 0, duration: 1, delay: 0.5 })

        tl.fromTo(textRef.current, 
            { scale: 0.5, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
        );

        const particles = gsap.utils.toArray(".particle");

        // 🔹 UPDATE THIS PART to add orbiting motion
        particles.forEach((p, i) => {
            const radius = gsap.utils.random(80, 180); // distance from center for orbit
            gsap.to(p, {
                rotation: 360,
                transformOrigin: `-${radius}px -${radius}px`,
                duration: gsap.utils.random(6, 12),
                repeat: -1,
                ease: "linear"
            });

            // also keep floating/random motion
            gsap.fromTo(p,
                { x: 0, y: 0, opacity: 1 },
                {
                    x: () => gsap.utils.random(-radius, radius),
                    y: () => gsap.utils.random(-radius, radius),
                    opacity: () => gsap.utils.random(0.3, 0.9),
                    duration: () => gsap.utils.random(1.5, 4),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );
        });

    }, [onFinish]) // depend on onFinish

  return (
    <div
        className='loading-page'
        ref={containerRef}
    >
        <div className='center-container'>
            <div className='sphere' ref={sphereRef}></div>
            <h1 className='neurora-text' ref={textRef}>NEURORA</h1>
        </div>

        {/* Particles */}
        {[...Array(30)].map((_, i) => (
            <div key={i} 
                className='particle'
                style={{
                    width: `${gsap.utils.random(4, 10)}px`,
                    height: `${gsap.utils.random(4, 10)}px`,
                    background: `radial-gradient(circle, ${gsap.utils.random(['#8e2de2','#4a00e0','#6a0dad'])}, #000)`
                }}
            ></div>
        ))}
    
    </div>
  )
}
