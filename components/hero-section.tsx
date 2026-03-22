"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Organic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-primary/8 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase">
              Biotecnología Acuática
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] text-balance">
              10x más proteína.{" "}
              <span className="text-primary">
                Nutrición que se duplica cada 24 horas.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              EcoLemna aprovecha la fuerza de la Lemna minor para ofrecer el alimento más potente y sostenible para tus peces.
            </p>
            
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold px-8 py-6 rounded-full shadow-[0_0_30px_rgba(182,255,64,0.3)] hover:shadow-[0_0_50px_rgba(182,255,64,0.5)] transition-all duration-300"
            >
              Descubrir EcoLemna
            </Button>
          </div>

          {/* Right Side - Visual Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-card via-secondary/50 to-card border border-border/50 backdrop-blur-sm flex items-center justify-center p-8 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                  [PLACEHOLDER VISUAL: Macro render 3D de un pellet de EcoLemna cayendo en agua cristalina, con hojas sutiles de Lemna around. Iluminación lateral premium estilo Sony]
                </p>
              </div>
            </div>
            
            {/* Decorative glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Wave separator at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path 
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z" 
            fill="currentColor" 
            className="text-card"
          />
        </svg>
      </div>
    </section>
  )
}
