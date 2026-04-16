"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"

interface Message {
  role: "bot" | "user";
  text: string;
}

// 📌 NUESTRAS PREGUNTAS PREDETERMINADAS
const PREDEFINED_QUESTIONS = [
  "¿Cuáles son los precios?",
  "¿Cómo funciona el envío?",
  "¿Qué es la Lemna?",
  "Tiempo de crecimiento de la Lemna",
]

export function ChatbotBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: "bot", text: "¡Hola! Soy EcoBot 🌿. ¿Tienes alguna duda sobre nuestros productos o el proceso?" }
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatHistory, isOpen])

  // 🛠️ ACTUALIZACIÓN DE SENIOR: Ahora la función acepta texto directo (para los botones)
  const handleSendMessage = async (e?: React.FormEvent, directMessage?: string) => {
    if (e) e.preventDefault();
    
    // Tomamos el mensaje del botón, o lo que escribió el usuario
    const userMessage = directMessage || message.trim()
    if (!userMessage) return

    setMessage("") // Limpiamos el input
    
    setChatHistory(prev => [...prev, { role: "user", text: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      setChatHistory(prev => [...prev, { role: "bot", text: data.reply }])
    } catch (error) {
      setChatHistory(prev => [...prev, { role: "bot", text: "Error de conexión 🔌" }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 ${isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100"}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <div className={`fixed bottom-8 right-8 w-[350px] max-w-[90vw] h-[550px] max-h-[85vh] bg-card border border-border/50 shadow-2xl rounded-3xl flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"}`}>
        
        <div className="bg-primary p-4 rounded-t-3xl flex items-center justify-between text-primary-foreground shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="bg-background/20 p-2 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">EcoBot Asistente</h3>
              <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span> En línea
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-background/20 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/10">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 text-sm rounded-2xl flex gap-2 ${
                msg.role === "user" 
                ? "bg-primary text-primary-foreground rounded-br-none shadow-md shadow-primary/20" 
                : "bg-background border border-border/50 text-foreground rounded-bl-none shadow-sm"
              }`}>
                {msg.role === "bot" && <Bot className="w-4 h-4 shrink-0 mt-0.5 text-primary" />}
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-background border border-border/50 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-muted-foreground">
                <Bot className="w-4 h-4 text-primary" />
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Escribiendo...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* 🚀 NUEVA ZONA: BOTONES PREDETERMINADOS */}
        <div className="bg-background px-3 pt-3 pb-2 flex flex-wrap gap-2 border-t border-border/50">
          {PREDEFINED_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(undefined, question)}
              disabled={isLoading}
              className="text-xs font-medium bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-colors border border-border/50 disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => handleSendMessage(e)} className="p-3 bg-background rounded-b-3xl flex gap-2">
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu duda..."
            className="rounded-xl bg-secondary/30 border-none focus-visible:ring-primary/50"
            disabled={isLoading}
          />
          <Button disabled={!message.trim() || isLoading} type="submit" size="icon" className="rounded-xl shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
            <Send className="w-4 h-4" />
          </Button>
        </form>

      </div>
    </>
  )
}