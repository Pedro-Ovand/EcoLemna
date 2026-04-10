"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu, X, User, LogOut, Settings, Loader2 } from "lucide-react"

const navLinks = [
  { label: "Nutrición", href: "#nutricion" },
  { label: "Proceso", href: "#proceso" },
  { label: "Formatos", href: "#formatos" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Estado del usuario
  const [user, setUser] = useState<{ name: string; email: string; address: string } | null>(null)
  
  // Estados para el Modal del Perfil
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({ name: "", email: "", address: "", password: "" })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)

    // Cargamos los datos al iniciar
    const savedName = localStorage.getItem("user_name")
    if (savedName) {
      const email = localStorage.getItem("user_email") || ""
      const address = localStorage.getItem("user_address") || ""
      setUser({ name: savedName, email, address })
      setProfileData({ name: savedName, email, address, password: "" })
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    window.location.reload()
  }

  // --- LÓGICA DE ACTUALIZACIÓN DE PERFIL ---
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT", // Usamos PUT para "Actualizar"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalEmail: user?.email, // Necesitamos el original para buscarlo en la DB
          ...profileData
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Si todo sale bien, actualizamos la "mochila" (localStorage) y el estado visual
        localStorage.setItem("user_name", profileData.name)
        localStorage.setItem("user_email", profileData.email)
        localStorage.setItem("user_address", profileData.address)
        
        setUser({ name: profileData.name, email: profileData.email, address: profileData.address })
        alert("✅ " + data.message)
        setIsProfileOpen(false)
        
        // Un pequeño truco: recargar la página suavemente para que el carrito vea la nueva dirección
        window.location.reload()
      } else {
        alert("❌ " + data.error)
      }
    } catch (error) {
      alert("Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value })
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Eco<span className="text-primary">Lemna</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* AHORA EL NOMBRE ES UN BOTÓN QUE ABRE EL PERFIL */}
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full border border-primary/20 text-sm font-semibold transition-colors"
                  title="Editar Perfil"
                >
                  <User className="w-4 h-4" /> {user.name} <Settings className="w-3 h-3 ml-1 opacity-70"/>
                </button>
                <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-destructive transition-colors" title="Cerrar Sesión">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-6">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* MODAL DE CONFIGURACIÓN DE PERFIL */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Mi Perfil</DialogTitle>
            <DialogDescription>
              Actualiza tu información de envío y acceso.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" value={profileData.name} onChange={handleChange} required className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={profileData.email} onChange={handleChange} required className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección de Envío</Label>
              <Input id="address" value={profileData.address} onChange={handleChange} placeholder="Ej: Calle Principal 123..." required className="bg-background border-primary/50" />
            </div>
            <div className="space-y-2 pt-4 border-t border-border/50">
              <Label htmlFor="password">Nueva Contraseña <span className="text-muted-foreground font-normal text-xs">(Opcional)</span></Label>
              <Input id="password" type="password" value={profileData.password} onChange={handleChange} placeholder="Dejar en blanco para no cambiar" className="bg-background" />
            </div>
            
            <Button disabled={loading} type="submit" className="w-full mt-4 h-12 rounded-xl">
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Guardar Cambios"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}