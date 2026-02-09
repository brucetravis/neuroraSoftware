import React, { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'

export default function ChatWidget() {
    // state tohold all messages
    const [messages, setMessages] = useState([]) // initial state is an empty array
    // input state
    const [input, setInput] = useState("")
    // chat reference
    const chatEndRef = useRef(null)

    // scroll to tehh bottom whenever messages update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]) // watch out for messages to know if they have been updated


    const sendMessage = async () => {
        const trimmed = input.trim()
        // if the message is not trimmed, exit the function
        if (!trimmed) return

        // Add user message
        setMessages((prev) => [...prev, { sender: "user", text: trimmed }])
        setInput("")

        try {
            const res = await fetch("http://localhost:5000/aiAPI/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed })
            })

            const data = await res.json()
            setMessages((prev) => [...prev, { sender: "ai", text: data.reply }])

        } catch (err) {
            console.error(err)
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Error: Could not reach AI"}
            ])
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage()
    }

  return (
    <section
        className='chat-widget-section'
    >
        <h1>NEURORA AI ASSISTANT</h1>

        <div
            className='chat-widget-messages'
        >
            {messages.map((m, i) => (
                <div
                    key={i}
                    className='messages-section'
                    style={{
                        margin: "5px 0",
                        textAlign: m.sender === "user" ? "right" : "left",
                        color: m.sender === "user" ? "#007BFF" : "#00C853"
                    }}
                >
                    {m.sender === "user" ? "You: ": "AI: "} {m.text}
                </div>
            ))}
            
            <div ref={chatEndRef}></div>
        </div>

        <input 
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Type a message'
        />

        <button
            onClick={sendMessage}
        >
            Send
        </button>
    </section>
  )
}
