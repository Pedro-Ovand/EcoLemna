"use client"

const formats = [
  {
    title: "Pellets Flotantes",
    placeholder: "[PLACEHOLDER: Macro texturizado de Pellets flotando en envase mate oscuro]",
    description: "Diseñados para peces de superficie. Flotabilidad perfecta que permite una alimentación natural y observación del comportamiento.",
    features: ["Alta flotabilidad", "Fácil digestión", "Para peces de superficie"]
  },
  {
    title: "Polvo Integral",
    placeholder: "[PLACEHOLDER: Macro texturizado de Polvo fino en envase mate oscuro]",
    description: "Formulado especialmente para alevines y filtradores. Partículas ultrafinas que se dispersan uniformemente en el agua.",
    features: ["Partículas ultrafinas", "Ideal para alevines", "Para filtradores"]
  }
]

export function FormatsSection() {
  return (
    <section id="formatos" className="py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Formatos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Dúo Nutritivo
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {formats.map((format, index) => (
            <div 
              key={index} 
              className="group relative rounded-3xl overflow-hidden"
            >
              {/* Glassmorphism card */}
              <div className="relative bg-gradient-to-br from-card via-secondary/30 to-card border border-border/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_60px_rgba(182,255,64,0.15)]">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Visual Placeholder */}
                <div className="relative aspect-[4/3] rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center p-6 mb-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  <p className="relative text-muted-foreground text-sm text-center leading-relaxed z-10">
                    {format.placeholder}
                  </p>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {format.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {format.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {format.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
