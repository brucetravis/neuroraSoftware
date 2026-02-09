import React from 'react'
import WhyUs from './home-components/whyus/WhyUs'
import Pricing from './home-components/pricing/Pricing'
import Contact from './home-components/contact/Contact'
import Services from './home-components/services/Services'
import { useActive } from '../../contexts/active/ActiveContext'
import { useScrollRefs } from '../../contexts/scroll/ScrollContext'
import About from './home-components/about/About'

export default function Home() {
    
    const { setActiveSection } = useActive()

    // get the scroll references from the context
    const { sectionRefs } = useScrollRefs()

    // get each section id
    const { hero, about, services, whyUs, pricing, contact } = sectionRefs

  return (
    <div>
      <section ref={about}><About /></section>
      <section ref={services}><Services /></section>
      <section ref={whyUs}><WhyUs /></section>
      <section ref={pricing}><Pricing /></section>
      <section ref={contact}><Contact /></section>
    </div>
  )
}
