"use client"

import { Check, X } from "lucide-react"

const comparisons = [
  {
    feature: "Proteína",
    ecolemna: "40% proteína cruda",
    traditional: "12-18% proteína",
    ecolemnaWins: true
  },
  {
    feature: "Digestibilidad",
    ecolemna: "95% aprovechamiento",
    traditional: "60-70% aprovechamiento",
    ecolemnaWins: true
  },
  {
    feature: "Flotabilidad",
    ecolemna: "Control preciso",
    traditional: "Variable",
    ecolemnaWins: true
  },
  {
    feature: "Sostenibilidad",
    ecolemna: "100% renovable",
    traditional: "Alto impacto ambiental",
    ecolemnaWins: true
  },
  {
    feature: "Residuos",
    ecolemna: "Mínimos",
    traditional: "Elevados",
    ecolemnaWins: true
  }
]

export function ComparisonSection() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Comparativa
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
            Comparativa de Autoridad
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header - LO OCULTAMOS EN MÓVIL Y LO MOSTRAMOS EN MD (Desktop) */}
          <div className="hidden md:grid grid-cols-3 gap-4 mb-6 px-4">
            <div className="text-muted-foreground font-medium">Característica</div>
            <div className="text-center text-primary font-bold">EcoLemna</div>
            <div className="text-center text-muted-foreground font-medium">Alimento Tradicional</div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-6 md:space-y-4">
            {comparisons.map((item, index) => (
              <div 
                key={index}
                /* CAMBIO CLAVE: grid-cols-1 en móvil, grid-cols-3 en md */
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-6 md:p-4 rounded-3xl md:rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
              >
                {/* Nombre de la Característica */}
                <div className="font-bold text-lg md:text-base text-foreground border-b md:border-none pb-2 md:pb-0 mb-2 md:mb-0">
                  {item.feature}
                </div>

                {/* Columna EcoLemna */}
                <div className="flex items-center md:justify-center gap-3 bg-primary/5 md:bg-transparent p-3 md:p-0 rounded-xl">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex flex-col md:items-center">
                    <span className="text-[10px] uppercase font-bold text-primary md:hidden">EcoLemna</span>
                    <span className="text-primary font-semibold">{item.ecolemna}</span>
                  </div>
                </div>

                {/* Columna Tradicional */}
                <div className="flex items-center md:justify-center gap-3 opacity-70 md:opacity-100 p-3 md:p-0">
                  <X className="w-5 h-5 text-muted-foreground/50 shrink-0" />
                  <div className="flex flex-col md:items-center">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground md:hidden">Tradicional</span>
                    <span className="text-muted-foreground">{item.traditional}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom highlight */}
          <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 text-center">
            <p className="text-base md:text-lg text-foreground">
              EcoLemna supera en <span className="text-primary font-bold">todos los aspectos</span> a los alimentos tradicionales
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}