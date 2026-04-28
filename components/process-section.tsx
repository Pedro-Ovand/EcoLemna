"use client"

// 1. Modificamos la lista para que use tus imágenes en lugar de íconos
const steps = [
  {
    image: "/Crecimiento.jpeg", // 👈 Cambia esto por el nombre real de tu foto 1
    title: "Cultivo Rápido",
    description: "La Lemna minor se duplica naturalmente cada 24 horas, creando una fuente infinita de proteína."
  },
  {
    image: "/Secado.jpeg", // 👈 Cambia esto por el nombre real de tu foto 2
    title: "Procesamiento de secado",
    description: "Secado que preserva todos los nutrientes."
  },
  {
    image: "/crudayharina.jpg", // 👈 Cambia esto por el nombre real de tu foto 3
    title: "Nutrición Total",
    description: "Producto final rico en proteínas, vitaminas y aminoácidos esenciales."
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
            Detrás de EcoLemna
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative group mt-8 md:mt-0">
              {/* Card */}
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-3xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(182,255,64,0.1)] h-full flex flex-col">
                
                {/* Step number (La bolita con el número) */}
                <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-lg shadow-lg z-10">
                  {index + 1}
                </div>
                
                {/* 📸 ÁREA DE LA IMAGEN REAL */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-secondary/50 border border-border/50 mb-6 relative">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
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