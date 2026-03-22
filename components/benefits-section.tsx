"use client"

import { TrendingUp, Droplets, Leaf } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Crecimiento Acelerado",
    description: "10x más proteína que alimentos tradicionales. Observa un desarrollo más rápido y saludable en tus peces."
  },
  {
    icon: Droplets,
    title: "Agua Cristalina",
    description: "Alta digestibilidad significa menos residuos. Mantén tu acuario limpio por más tiempo."
  },
  {
    icon: Leaf,
    title: "100% Sostenible",
    description: "Producido con energía renovable y sin impacto ambiental. La elección responsable para el planeta."
  }
]

export function BenefitsSection() {
  return (
    <section id="nutricion" className="py-32 bg-card relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Beneficios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            ¿Por qué elegir EcoLemna?
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group text-center"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(182,255,64,0.3)] transition-all duration-300">
                <benefit.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
          <path 
            d="M0,60 C360,20 720,80 1080,40 C1260,20 1380,50 1440,40 L1440,80 L0,80 Z" 
            fill="currentColor" 
            className="text-background"
          />
        </svg>
      </div>
    </section>
  )
}
