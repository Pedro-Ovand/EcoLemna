"use client"

import { Facebook } from "lucide-react"

const footerLinks = [
  { label: "Nutrición", href: "#nutricion" },
  { label: "Proceso", href: "#proceso" },
  { label: "Productos", href: "#formatos" },
  { label: "Contacto", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-muted py-16 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo Actualizado */}
          <a href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all p-1">
              <img 
                src="/Logo-EcoLemna.png" 
                alt="Logo de EcoLemna" 
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-foreground">
              Eco<span className="text-primary">Lemna</span>
            </span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50 my-8" />

        {/* Copyright y Redes Sociales */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} EcoLemna. Todos los derechos reservados.
          </p>
          
          {/* Link de Facebook */}
          <div className="flex items-center justify-center">
            <a 
              href="https://www.facebook.com/share/1b4CmM9NyR/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#1877F2] transition-colors flex items-center gap-2 text-sm font-bold group"
            >
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Síguenos en Facebook</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}