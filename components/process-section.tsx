"use client"

import { RefreshCw, Cpu, Package } from "lucide-react"

const steps = [
  {
    icon: RefreshCw,
    title: "Cultivo Rápido",
    placeholder: "[PLACEHOLDER: Gráfico circular de la planta Lemna duplicándose en 24h]",
    description: "La Lemna minor se duplica naturalmente cada 24 horas, creando una fuente infinita de proteína."
  },
  {
    icon: Cpu,
    title: "Procesamiento Premium",
    placeholder: "[PLACEHOLDER: Ilustración de procesamiento tecnológico limpio]",
    description: "Tecnología de vanguardia que preserva todos los nutrientes esenciales."
  },
  {
    icon: Package,
    title: "Nutrición Total",
    placeholder: "[PLACEHOLDER: Gráfico de pellets y polvo final]",
    description: "Producto final rico en proteínas, vitaminas y minerales esenciales."
  }
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-32 bg-card relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            El Proceso
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            La Bio-fábrica Sostenible
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-3xl p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(182,255,64,0.1)]">
                {/* Step number */}
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                
                {/* Visual Placeholder */}
                <div className="aspect-video rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center p-4 mb-6">
                  <p className="text-muted-foreground text-xs text-center leading-relaxed">
                    {step.placeholder}
                  </p>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
          <path 
            d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" 
            fill="currentColor" 
            className="text-background"
          />
        </svg>
      </div>
    </section>
  )
}
