"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus, ShoppingCart, Trash2, Truck, CreditCard } from "lucide-react"

interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

export function FormatsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Record<number, number>>({}) // { id: cantidad }
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Datos del usuario desde localStorage
  const [userData, setUserData] = useState({ name: "", address: "" })

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
        
        // Recuperar datos del perfil
        setUserData({
          name: localStorage.getItem("user_name") || "",
          address: localStorage.getItem("user_address") || ""
        })
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    loadData()
  }, [])

  // --- LÓGICA DEL CARRITO ---
  const addToCart = (id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[id] > 1) newCart[id] -= 1
      else delete newCart[id]
      return newCart
    })
  }

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  
  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === Number(id))
      return total + (product?.precio || 0) * qty
    }, 0)
  }

  if (loading) return null

  return (
    <section id="formatos" className="py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">Nuestros Formatos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-card border border-border/50 rounded-3xl p-8">
              <div className="aspect-video bg-secondary/30 rounded-2xl mb-6 flex items-center justify-center">
                <p className="text-muted-foreground">Imagen {product.nombre}</p>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{product.nombre}</h3>
                  <p className="text-primary font-bold">${product.precio} USD</p>
                </div>
                <Button 
                  onClick={() => addToCart(product.id)}
                  disabled={product.stock === 0}
                  className="rounded-xl"
                >
                  <Plus className="mr-2 h-4 w-4" /> Añadir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🛒 BOTÓN FLOTANTE DEL CARRITO (Lado opuesto al ChatBot) */}
      {cartCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-8 bg-primary text-primary-foreground p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-subtle z-40 hover:scale-105 transition-transform"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
              {cartCount}
            </span>
          </div>
          <span className="font-bold">Ver Pedido</span>
        </button>
      )}

      {/* 🧾 MODAL DE PAGO MÚLTIPLE */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card rounded-3xl">
          {!isOrdered ? (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl">Tu Carrito de EcoLemna</DialogTitle>
                <DialogDescription>Revisa tus productos antes de finalizar.</DialogDescription>
              </DialogHeader>

              {/* Lista de productos en el carrito */}
              <div className="space-y-3">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find(prod => prod.id === Number(id))
                  return (
                    <div key={id} className="flex justify-between items-center bg-background p-4 rounded-xl border border-border">
                      <div>
                        <p className="font-bold">{p?.nombre}</p>
                        <p className="text-xs text-muted-foreground">${p?.precio} x {qty}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => removeFromCart(Number(id))} className="p-1 hover:text-destructive"><Minus className="w-4 h-4"/></button>
                        <span className="font-medium">{qty}</span>
                        <button onClick={() => addToCart(Number(id))} className="p-1 hover:text-primary"><Plus className="w-4 h-4"/></button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* DIRECCIÓN AUTOMÁTICA */}
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 space-y-2">
                <p className="text-xs font-bold text-primary uppercase flex items-center gap-2">
                  <Truck className="w-3 h-3"/> Envío a tu dirección guardada:
                </p>
                <p className="text-sm font-medium">{userData.address || "No hay dirección guardada. Por favor regístrate."}</p>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-xl font-black mb-6">
                  <span>Total a pagar:</span>
                  <span>${(calculateTotal() + 5).toFixed(2)}</span>
                </div>
                <Button 
                  onClick={() => setIsOrdered(true)}
                  disabled={!userData.address || cartCount === 0}
                  className="w-full h-14 text-lg rounded-2xl"
                >
                  <CreditCard className="mr-2" /> Confirmar Compra Total
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="text-6xl">🚀</div>
              <h3 className="text-3xl font-bold">¡Despegue Nutritivo!</h3>
              <p className="text-muted-foreground">
                Gracias <strong>{userData.name}</strong>. Hemos enviado tu pedido múltiple a <strong>{userData.address}</strong>.
              </p>
              <Button onClick={() => {setCart({}); setIsCartOpen(false); setIsOrdered(false)}} className="w-full">Volver a la tienda</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}