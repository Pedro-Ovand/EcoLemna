"use client"

import { useState, useEffect } from "react"
import { Leaf } from "lucide-react"

export function ChatbotBubble() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasShownInitial, setHasShownInitial] = useState(false)

  useEffect(() => {
    // Show tooltip after 2 seconds on initial load
    const timer = setTimeout(() => {
      setShowTooltip(true)
      setHasShownInitial(true)
      
      // Hide after 5 seconds
      setTimeout(() => {
        setShowTooltip(false)
      }, 5000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full right-0 mb-3 w-64 transition-all duration-300 ${
          showTooltip 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-card border border-border rounded-2xl p-4 shadow-xl">
          <p className="text-foreground text-sm leading-relaxed">
            ¿Dudas sobre la dieta? Pregúntale a nuestro <span className="text-primary font-medium">Experto</span>.
          </p>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </div>
      </div>

      {/* Bubble Button */}
      <button 
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(182,255,64,0.4)] hover:shadow-[0_0_50px_rgba(182,255,64,0.6)] hover:scale-110 transition-all duration-300 group"
        onMouseEnter={() => hasShownInitial && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Abrir chat con experto"
      >
        <Leaf className="w-6 h-6 text-primary-foreground group-hover:rotate-12 transition-transform" />
      </button>

      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
    </div>
  )
}
