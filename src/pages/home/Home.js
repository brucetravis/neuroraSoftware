import React from 'react'
import Pricing from './home-components/pricing/Pricing'
import { useActive } from '../../contexts/active/ActiveContext'
import { useScrollRefs } from '../../contexts/scroll/ScrollContext'
import Contact from './home-components/contact/Contact'
import WhyUs from './home-components/whyus/WhyUs'

export default function Home() {
    
    const { setActiveSection } = useActive()

    // get the scroll references from the context
    const { sectionRefs } = useScrollRefs()

    // get each section id
    const { hero, about, services, whyUs, pricing, contact } = sectionRefs

  return (
    <div>
      <section ref={whyUs}><WhyUs /></section>
      <section ref={pricing}><Pricing /></section>
      <section ref={contact}><Contact /></section>
    </div>
  )
}
