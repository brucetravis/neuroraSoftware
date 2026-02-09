import React from 'react'
import './WhyUs.css'
import DancingRobotGif from '../../../../videos/robot-unscreen.gif'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useSpring, animated, useTrail } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'


export default function WhyUs() {

  // InView hook
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  // Floating GIF component (Three.js animation)
  function FloatingGif() {
    const meshRef = React.useRef()
    const texture = useTexture(DancingRobotGif)

    useFrame(({ clock }) => {
      const t = clock.getElapsedTime()
      if (!meshRef.current) return
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.15
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.1

      // Safely update material opacity
      const material = meshRef.current.children[0]?.material
      if (material) material.opacity = 0.1 + Math.sin(t * 3) * 0.05
    })

    return (
      <group ref={meshRef}>
        <mesh scale={[1.1, 1.1, 1]}>
          <planeGeometry args={[9, 10]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[9, 10]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      </group>
    )
  }

  // Points for trail animation
  const points = [
    'Cutting-edge AI solutions',
    'Streamlined business automation',
    'Scalable and robust software',
    'Expert support & consultation'
  ]

  // React Spring for smooth, non-conflicting animations
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    config: { tension: 220, friction: 22 },
    pause: !inView,        // prevents looping
    immediate: !inView     // avoids back-and-forth recalculation
  })

  const trail = useTrail(points.length, {
    opacity: inView ? 1 : 0,
    x: inView ? 0 : -20,
    config: { mass: 1, tension: 260, friction: 20 },
    pause: !inView,
    immediate: !inView
  })


  const titleSpring2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 },
    delay: 150 // tiny offset to avoid conflicts
    })



    return (
        <section className="whyus-hero" ref={ref}>
            <animated.h4 style={{ opacity: titleSpring.opacity, transform: titleSpring.y.to(v => `translateY(${v}px)`) }} className="whyus-title">
              Why Neurora
            </animated.h4>

            <animated.h2 style={titleSpring2} className="whyus-heading">
              AI-Driven Solutions That Scale <span className="accent">Your Business</span>
            </animated.h2>

            <div className="whyus-inner">
              <div className="whyus-left">
                  <Canvas style={{ width: '100%', height: '400px', pointerEvents: 'none' }}>
                  <ambientLight intensity={1} />
                  <FloatingGif />
                  </Canvas>
              </div>

              <div className="whyus-right">
                  {trail.map((props, index) => (
                    <animated.div key={index} style={props} className="whyus-point">
                        {points[index]}
                    </animated.div>
                  ))}
              </div>
            </div>
        </section>
    )
}
