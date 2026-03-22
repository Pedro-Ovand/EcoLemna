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
    <section className="py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Comparativa
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Comparativa de Autoridad
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-muted-foreground font-medium">
              Característica
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-bold border border-primary/30">
                EcoLemna
              </span>
            </div>
            <div className="text-center text-muted-foreground font-medium">
              Alimento Tradicional
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <div 
                key={index}
                className="grid grid-cols-3 gap-4 items-center p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="font-medium text-foreground">
                  {item.feature}
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-primary font-medium">
                      {item.ecolemna}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2">
                    <X className="w-5 h-5 text-muted-foreground/50" />
                    <span className="text-muted-foreground">
                      {item.traditional}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom highlight */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 text-center">
            <p className="text-lg text-foreground">
              EcoLemna supera en <span className="text-primary font-bold">todos los aspectos</span> a los alimentos tradicionales
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
