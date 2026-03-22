"use client"

const footerLinks = [
  { label: "Nutrición", href: "#nutricion" },
  { label: "Proceso", href: "#proceso" },
  { label: "Formatos", href: "#formatos" },
  { label: "Contacto", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-muted py-16 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <svg 
                className="w-6 h-6 text-primary" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">
              Eco<span className="text-primary">Lemna</span>
            </span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50 my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} EcoLemna. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
