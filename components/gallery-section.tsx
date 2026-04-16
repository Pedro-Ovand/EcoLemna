"use client"

// 1. AHORA USAMOS 'src' PARA LA RUTA DE TU IMAGEN
const galleryItems = [
  {
    src: "/gallery/pez.jpg", // Asegúrate de que el nombre coincida exactamente con el de tu carpeta
    alt: "Equipo completo EcoLemna",
    size: "large",
    span: "col-span-2 row-span-2"
  },
  {
    src: "/Medicion.jpeg",
    alt: "Medicion de calidad de agua con equipo profesional",
    size: "medium",
    span: "col-span-1 row-span-1"
  },
  {
    src: "Pileta_Lemna.jpeg",
    alt: "Pileta de cultivo de Lemna con agua de pozo",
    size: "medium",
    span: "col-span-1 row-span-1"
  },
  {
    src: "/Transformacion.jpeg",
    alt: "Proceso de transformación de la Lemna a polvo",
    size: "small",
    span: "col-span-1 row-span-1"
  },
  {
    src: "/Proceso_Transformacion_2.png",
    alt: "aa",
    size: "small",
    span: "col-span-1 row-span-1"
  }
]

export function GallerySection() {
  return (
    <section className="py-32 bg-card relative overflow-hidden">
      {/* Fondo orgánico */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Encabezado de la Sección */}
        <div className="text-center mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Galería
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Galería Deep Green
          </h2>
        </div>

        {/* Cuadrícula Asimétrica (Asymmetric Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className={`${item.span} group relative rounded-2xl overflow-hidden bg-background border border-border/50 hover:border-primary/50 transition-all duration-300`}
            >
              {/* Contenedor invisible para dar la altura */}
              <div className={`w-full ${item.size === 'large' ? 'min-h-[400px]' : 'min-h-[250px]'}`} />
              
              {/* 2. LA MAGIA DE LA IMAGEN AQUÍ */}
              <img 
                src={item.src} 
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Degradado oscuro sobre la imagen para que luzca premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Separador de ondas */}
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