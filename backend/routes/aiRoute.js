console.log("✅ aiAPI loaded")
console.log(`This is my OPENAI_API_KEY: ${process.env.OPENAI_API_KEY}`)

// import the express framework o create a route
const express = require('express')
// import openai from the openaiclient instance
const openai = require("../openaiclient")

// create a minimalist router
const router = express.Router()


router.get('/aiRoute', (req, res) => {
    res.json({ message: "AI Backend Running." })
})


router.post("/chat", async (req, res) => {
    try {
        
        const { message } = req.body

        if (!message) {
            // return an invalid data error
            return res.status(400).json({ message: "Message is required." })
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content: `
                    You are a helpful assistant for Neurora.
                    Neurora Innovations is a software development company specializing in creating cutting-edge software, websites, 
                    applications, and systems designed to automate and streamline processes. Our mission is to integrate artificial 
                    intelligence into software development, building smart, intelligent solutions that empower businesses and users 
                    through automation and innovation.

                    Pricing: Review the official pricing section before answering questions about costs.
                    CEO: Bruce Travis is the Founder/CEO of NeuroraInnovations.
                    About Bruce Travis: Bruce Travis is a Techpreneur in the Tech an robotics space. He is a cybersecurity major and 
                                        Tech enthusiast. He founded Neurora in 2025 and has been a leading inovator in the software development 
                                        sector.
                    Feedback: After payment we MUST schedule a meeting with the client.
                    Hosting: Hosting fees are separate from the developers charges.
                    Domain: Domain fees are separate from the developers charges. If the client does not have a 
                            domain they can be assisten in purchasing one
                    
                    AI: There areextra charges for integrating AI to software.
                    Additiona Info: For any additional info, a client can contact +254 793764742.
                    Why Neurora: Neurora streamlines and automates all aspects of your software systems, enabling businesses to operate 
                                more efficiently and boost sales. From accounting and sales records to everyday operations, our intelligent solutions 
                                reduce manual effort and decision fatigue, allowing clients to focus on growth and strategic priorities.
                    Always answer accurately based only on this information. If you don’t know, say "I don’t have information on that."
                    `
                },

                {
                    role: "user",
                    content: message,
                },
            ],
        });

        res.json({
            reply: response.choices[0].message.content
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "AI request failed" })
    }
})

// export the oruter
module.exports = router

