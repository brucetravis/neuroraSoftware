import { createContext, useContext, useRef } from "react";

// create the context
const ScrollContext = createContext()

// custom hook for the context
export const useScrollRefs = () => useContext(ScrollContext)


export default function ScrollProvider({ children }) {

    // create refs for each section
    const heroRef = useRef(null)
    const aboutRef = useRef(null)
    const servicesRef = useRef(null)
    const whyUsRef = useRef(null)
    const pricingRef = useRef(null)
    const contactRef = useRef(null)

    // Map section ids to refs
    const sectionRefs = {
        hero: heroRef,
        about: aboutRef,
        services: servicesRef,
        whyUs: whyUsRef,
        pricing: pricingRef,
        contact: contactRef
    }

    // function to scrolll to a specific section
    const scrollToSection = (id) => {
        // Take the id of a specific section
        const section = sectionRefs[id]

        // if the section matches teh current section being clicked
        if (section && section.current) {
            // scroll to the section
            section.current.scrollIntoView({ behavior: 'smooth' })
        }
    }


    return (
        <ScrollContext.Provider value={{ scrollToSection, sectionRefs }}>
            { children }
        </ScrollContext.Provider>
    )
}