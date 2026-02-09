import { createContext, useContext, useState } from "react";

// create the active context
const ActiveContext = createContext()

// create a custom hook for teh context
export const useActive = () => useContext(ActiveContext)


export default function ActiveProvider({children}) {

    // state to observe which section is active
    const [ activeSection, setActiveSection ] = useState('hero') // current section is the hero section

    return(
        <ActiveContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </ActiveContext.Provider>
    )
}