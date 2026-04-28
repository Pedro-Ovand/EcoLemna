"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Leaf, Loader2, MapPin } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "" // ← Nuevo campo
  })

  useEffect(() => {
    setFormData({ name: "", email: "", password: "", address: "" })
  }, [isLogin])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        if (isLogin) {
          // GUARDAMOS TODO EN LOCALSTORAGE
          localStorage.setItem("user_name", data.user.name);
          localStorage.setItem("user_address", data.user.address); // ← Dirección recordada
          localStorage.setItem("user_email", data.user.email);
          
          router.push("/")
          router.refresh() 
        } else {
          alert("✅ " + data.message)
          setIsLogin(true)
        }
      } else {
        alert("❌ " + data.error)
      }
    } catch (error) {
      alert("Error de conexión con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Volver a EcoLemna
      </Link>

      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? "Bienvenido de nuevo" : "Únete a EcoLemna"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Accede a tu cuenta" : "Crea tu perfil y ahorra tiempo en tus envíos"}
          </p>
        </div>

        <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-xl">
          <form className="space-y-4" onSubmit={handleAuth}>
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" placeholder="Nombre completo" required value={formData.name} onChange={handleChange} className="bg-background rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary"/> Dirección de envío
                  </Label>
                  <Input 
                    id="address" 
                    placeholder="Calle, Número, Ciudad, CP" 
                    required 
                    value={formData.address} 
                    onChange={handleChange} 
                    className="bg-background rounded-xl" 
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required value={formData.email} onChange={handleChange} className="bg-background rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" required value={formData.password} onChange={handleChange} className="bg-background rounded-xl" />
            </div>
            
            <Button disabled={loading} className="w-full bg-primary text-primary-foreground h-12 rounded-xl text-lg font-medium mt-6 shadow-lg shadow-primary/20">
              {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Entrar" : "Registrarse y Guardar Datos")}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya eres miembro?"}
            </span>{" "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold hover:underline">
              {isLogin ? "Crear cuenta ahora" : "Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}