"use client"

const galleryItems = [
  {
    placeholder: "[PLACEHOLDER: Pez espectacular con colores vibrantes tras comer EcoLemna]",
    size: "large",
    span: "col-span-2 row-span-2"
  },
  {
    placeholder: "[PLACEHOLDER: Textura macro close-up de la Lemna minor viva]",
    size: "medium",
    span: "col-span-1 row-span-1"
  },
  {
    placeholder: "[PLACEHOLDER: Foto de producto premium minimalista en entorno natural oscuro]",
    size: "medium",
    span: "col-span-1 row-span-1"
  },
  {
    placeholder: "[PLACEHOLDER: Acuario con agua cristalina y peces saludables]",
    size: "small",
    span: "col-span-1 row-span-1"
  },
  {
    placeholder: "[PLACEHOLDER: Detalle de pellets con iluminación dramática]",
    size: "small",
    span: "col-span-1 row-span-1"
  }
]

export function GallerySection() {
  return (
    <section className="py-32 bg-card relative overflow-hidden">
      {/* Organic background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Galería
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Galería Deep Green
          </h2>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className={`${item.span} group relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/50 to-background border border-border/50 hover:border-primary/30 transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`flex items-center justify-center p-6 ${item.size === 'large' ? 'min-h-[400px]' : 'min-h-[200px]'}`}>
                <p className="text-muted-foreground text-sm text-center leading-relaxed max-w-xs">
                  {item.placeholder}
                </p>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
          <path 
            d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" 
            fill="currentColor" 
            className="text-muted"
          />
        </svg>
      </div>
    </section>
  )
}
