import React, { useEffect } from 'react'
import './Home.css'
import Hero from './home-components/hero/Hero'
import About from './home-components/about/About'
import Services from './home-components/services/Services'
import WhyUs from './home-components/whyus/WhyUs'
import Pricing from './home-components/pricing/Pricing'
import Contact from './home-components/contact/Contact'
import { useActive } from '../../contexts/active/ActiveContext'
import { useScrollRefs } from '../../contexts/scroll/ScrollContext'
import Software from './home-components/software/Software'

export default function Home() {

  const { setActiveSection } = useActive()

  // get the scroll references from the context
  const { sectionRefs } = useScrollRefs()

  // get each section id
  const { hero, about, services, whyus, software, pricing, contact } = sectionRefs

  useEffect(() => {

    const sections = [
      { ref: hero, id: 'hero' },
      { ref: about, id: 'about' },
      { ref: services, id: 'services' },
      { ref: software, id: 'software' },
      { ref: whyus, id: 'whyus' },
      { ref: pricing, id: 'pricing' },
      { ref: contact, id: 'contact' }
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },

      { 
        threshold: 0.3,
        rootMargin: "-80px 0px 0px 0px"
      } // triggers when 30% of the section is visible 
    )

    sections.forEach(section => {
      if (section.ref.current) {
        section.ref.current.id = section.id //assign an Id for teh observer
        observer.observe(section.ref.current)
      }
    })

    return () => observer.disconnect()

  }, [ hero, about, services, whyus, software, pricing, contact, setActiveSection ])

  useEffect(() => {
    
    // delay to ensure browser layout is ready before scrolling
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, smooth: 0 })
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <section ref={hero}><Hero /></section>
      <section ref={about}><About /></section>
      <section ref={services}><Services /></section>
      <section ref={software}><Software /></section>
      <section ref={whyus}><WhyUs /></section>
      <section ref={pricing}><Pricing /></section>
      <section ref={contact}><Contact /></section>
    </div>
  )
}