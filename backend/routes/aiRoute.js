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
                    Neurora is a software development company that builds intelligent software and AI-powered solutions to 
                    help African businesses adopt, manage, and optimize AI features.

                    Pricing: Review the official pricing section before answering questions about costs.
                    CEO: Bruce is the Founder/CEO of NeuroraInnovations.
                    About Bruce Travis: Bruce is a Techpreneur in the Tech an robotics space. He is a cybersecurity major and 
                                        Tech enthusiast. He founded Neurora in 2025 and has been a leading invovator in AI adoption.
                    Feedback: After payment we MUST schedule a meeting with the client.
                    Hosting: Hosting fees are separate from the developers charges.
                    Domain: Domain fees are separate from the developers charges. If the client does not have a 
                            domain they can be assisten in purchasing one
                    
                    AI Adoption: From entry-level adoption guidance to subscription management, real-time performance analytics, and strategic growth recommendations, Neurora empowers startups, SMEs, and enterprises to confidently Adopt AI into their workflows, make data-driven decisions, and achieve measurable results..
                    
                    AI Integration: There are extra charges for integrating AI to software.
                    Additiona Info: For any additional info, a client can contact +254 793764742.
                    Why Neurora: Neurora is a software development company that builds intelligent software and AI-powered solutions 
                                to help African businesses adopt, manage, and optimize AI features. Our platform guides businesses on which AI tools to use, 
                                tracks performance, provides actionable insights, and recommends strategic actions to maximize growth and efficiency. 
                                From entry-level adoption guidance to subscription management, real-time performance analytics, and strategic growth recommendations, 
                                Neurora empowers startups, SMEs, and enterprises to confidently <strong className='accent'>Adopt</strong> AI into their workflows, 
                                make data-driven decisions, and achieve measurable results.

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

