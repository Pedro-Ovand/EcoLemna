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
  { label: "Productos", href: "#formatos" },
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
          <Link href="/" className="flex items-center gap-3 group">
  {/* Agrandamos la caja a w-12 h-12 (o cámbialo a w-14 h-14 si lo quieres aún más grande) */}
  <div className="w-22 h-22 rounded-xl bg-primary/0 flex items-center justify-center group-hover:bg-primary/30 transition-all p-1">
    <img 
      src="/Logo-EcoLemna.png" 
      alt="Logo de EcoLemna" 
      /* La imagen ahora toma todo el alto de su nueva caja grande */
      className="h-full w-auto object-contain"
    />
  </div>
  {/* Hice el texto un poquito más grande (text-2xl) para que combine con el nuevo logo */}
  <span className="text-2xl font-bold tracking-tight">Eco<span className="text-primary">Lemna</span></span>
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

        {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 py-6 px-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-border/50">
              {user ? (
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-primary/10 text-primary rounded-2xl font-bold"
                  >
                    <User className="w-5 h-5" /> Mi Perfil
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full text-muted-foreground py-2"
                  >
                    <LogOut className="w-5 h-5" /> Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 rounded-2xl text-lg font-bold">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
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