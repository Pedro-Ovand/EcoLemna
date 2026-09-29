"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Minus, ShoppingCart, Truck, CreditCard, AlertTriangle, Image as ImageIcon, GraduationCap, CheckCircle2 } from "lucide-react"

interface Product {
  id: number;
  nombre: string;
  precio: number | string;
  stock: number;
}

// TARJETA DE PRODUCTO (Harina de Lemna)
function ProductVariantCard({ title, image, variants, onAddToCart }: { title: string, image: string, variants: Product[], onAddToCart: (id: number) => void }) {
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  
  useEffect(() => {
    if (variants.length > 0 && !selectedVariantId) setSelectedVariantId(variants[0].id);
  }, [variants, selectedVariantId]);
  
  const selectedVariant = variants.find(v => v.id === selectedVariantId) || variants[0];
  if (!selectedVariant) return null;

  return (
    <div className="bg-card border border-border/60 rounded-[32px] p-6 hover:shadow-2xl transition-all duration-500 flex flex-col group">
      
      {/* AREA DE LA IMAGEN REAL AJUSTADA */}
      <div className="aspect-square bg-secondary/20 rounded-[24px] mb-6 flex items-center justify-center border border-border relative overflow-hidden p-4">
        <img 
          src={image} 
          alt={title} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <h3 className="text-3xl font-black tracking-tighter mb-6 text-center">{title}</h3>
      <div className="flex-grow space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-center text-primary">Tamaño: 50g</p>
          <div className="flex justify-center">
            <span className="px-5 py-2.5 rounded-full text-xs font-black border-2 border-primary bg-primary text-primary-foreground">
              50g
            </span>
          </div>
        </div>
        <div className="pt-6 border-t border-border/50 text-center">
          <p className="text-4xl font-black">$51.63 <span className="text-xs text-primary">MXN</span></p>
        </div>
      </div>
      <Button onClick={() => onAddToCart(selectedVariant.id)} disabled={selectedVariant.stock === 0} className="w-full h-16 rounded-[20px] text-lg font-black mt-8 shadow-xl shadow-primary/10 transition-all hover:-translate-y-1">
        <Plus className="mr-2 h-6 w-6" /> Añadir
      </Button>
    </div>
  );
}

// TARJETA DE SERVICIO (Capacitacion)
function ServiceCard({ service, onAddToCart }: { service: Product, onAddToCart: (id: number) => void }) {
  const puntos = [
    "1 kilo de Lemna Cruda/Harina (a elegir) o medio kilo de ambas",
    "Manual técnico en Zapoteco o Náhuatl",
    "1 capacitación semanal (4 sesiones al mes)",
  ];

  return (
    <div className="mt-8 md:mt-16 bg-primary/5 border-2 border-primary/20 rounded-[32px] md:rounded-[40px] p-6 md:p-8 lg:p-12 relative overflow-hidden group">
      {/* Icono de fondo - Lo ocultamos en moviles muy pequeños para limpiar la vista */}
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700 hidden sm:block">
        <GraduationCap size={200} />
      </div>
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6">
            <GraduationCap className="w-4 h-4" /> Servicio de Capacitación
          </div>
          {/* Titulo responsivo: mas pequeño en movil (text-3xl) y grande en escritorio (md:text-5xl) */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-6">Kit de Cultivo</h3>
          <div className="space-y-3">
            {puntos.map((punto, i) => (
              <div key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
                <span>{punto}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Caja de Precio Ajustada */}
        <div className="bg-card border border-border/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Inversión del Servicio</p>
          
          {/* PRECIO: text-4xl en movil, sube a 5xl y luego a 6xl en pantallas grandes */}
          <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary mb-6 md:mb-8 break-words">
            ${Number(service.precio).toFixed(2)} 
            <span className="text-sm block sm:inline ml-1">MXN</span>
          </p>
          
          <Button onClick={() => onAddToCart(service.id)} className="w-full h-16 md:h-20 rounded-[18px] md:rounded-[24px] text-lg md:text-xl font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95">
            Reservar Capacitación
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FormatsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Record<number, number>>({})
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({ name: "", address: "" })

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
        setUserData({ name: localStorage.getItem("user_name") || "", address: localStorage.getItem("user_address") || "" });
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    loadData()
  }, [])

  const addToCart = (id: number) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  const removeFromCart = (id: number) => {
    setCart(prev => { const newCart = { ...prev }; if (newCart[id] > 1) newCart[id] -= 1; else delete newCart[id]; return newCart; })
  }

  // AQUI RESTAURAMOS EL CONTADOR TOTAL DE PRODUCTOS
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const calculateTotal = () => {
    if (!Array.isArray(products)) return 0;
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const p = products.find(prod => prod.id === Number(id));
      return total + (Number(p?.precio) || 0) * qty;
    }, 0)
  }

  const harina = Array.isArray(products) ? products.filter(p => p.nombre.toLowerCase().includes('harina')) : [];
  const servicio = Array.isArray(products) ? products.find(p => p.nombre.toLowerCase().includes('capacitación')) : null;

  if (loading) return null

  return (
    <section id="formatos" className="py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Nuestra Oferta</h2>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">Productos y Servicios</p>
        </div>

        {/* RECUADRO DE PRODUCTO CENTRADO */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {harina.length > 0 && (
              <ProductVariantCard 
                title="Harina de Lemna" 
                image="/Harina_Lemna_50g.jpg" /* AQUI PONES EL NOMBRE DE TU FOTO */
                variants={harina} 
                onAddToCart={addToCart} 
              />
            )}
          </div>
        </div>

        {/* RECUADRO DE SERVICIO (ABAJO) */}
        {servicio && <ServiceCard service={servicio} onAddToCart={addToCart} />}
      </div>

      {/* CARRITO FLOTANTE */}
      {cartCount > 0 && (
        <button onClick={() => setIsCartOpen(true)} className="fixed bottom-24 right-8 bg-primary text-primary-foreground p-4 rounded-2xl shadow-2xl z-40 animate-bounce-subtle flex items-center gap-3 transition-transform active:scale-90 hover:scale-105">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
              {cartCount}
            </span>
          </div>
          <span className="font-bold text-sm uppercase tracking-tighter pr-2">Tu Pedido</span>
        </button>
      )}

      {/* MODAL CARRITO */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-[480px] bg-card rounded-[40px] border-border">
          {!isOrdered ? (
            <div className="space-y-6 py-4">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black text-center tracking-tight">Resumen</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find(prod => prod.id === Number(id))
                  return (
                    <div key={id} className="flex justify-between items-center bg-background p-4 rounded-[20px] border border-border shadow-sm">
                      <div>
                        <p className="font-black text-sm">{p?.nombre}</p>
                        <p className="text-xs text-primary font-bold">${Number(p?.precio).toFixed(2)} MXN x {qty}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-secondary/30 rounded-full p-1.5 border border-border/50">
                         <button onClick={() => removeFromCart(Number(id))} className="p-1 hover:text-destructive"><Minus className="w-4 h-4"/></button>
                         <span className="font-black text-xs w-4 text-center">{qty}</span>
                         <button onClick={() => addToCart(Number(id))} className="p-1 hover:text-primary"><Plus className="w-4 h-4"/></button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* DIRECCION DE ENVIO RESTAURADA */}
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 space-y-2 mt-2">
                <p className="text-xs font-bold text-primary uppercase flex items-center gap-2">
                  <Truck className="w-4 h-4"/> Envío a tu dirección:
                </p>
                <p className="text-sm font-medium">{userData.address || "No hay dirección guardada. Regístrate en Mi Perfil."}</p>
              </div>

              <div className="pt-4 border-t border-border flex flex-col gap-4">
                <div className="flex justify-between items-center px-2">
                  {/* 1. Quitamos la frase "(+ Envío)" */}
                  <span className="font-black text-muted-foreground uppercase text-xs tracking-widest">Total:</span>
                  
                  {/* 2. Le quitamos el "+ 5" a la fórmula matemática */}
                  <span className="text-3xl font-black text-primary">${calculateTotal().toFixed(2)} <span className="text-xs">MXN</span></span>
                </div>
                {/* Botón deshabilitado si no hay dirección */}
                <Button onClick={() => setIsOrdered(true)} disabled={!userData.address || cartCount === 0} className="w-full h-16 rounded-[24px] text-lg font-black shadow-lg shadow-primary/20">
                  <CreditCard className="mr-2 h-6 w-6" /> Pagar Seguro
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 animate-bounce"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold">¡Pedido Confirmado!</h3>
              <p className="text-muted-foreground text-balance">
                Gracias <strong>{userData.name}</strong>. Hemos procesado tu compra y el envío está programado a <strong>{userData.address}</strong>.
              </p>
              <Button onClick={() => {setCart({}); setIsCartOpen(false); setIsOrdered(false)}} className="w-full h-14 rounded-2xl mt-4">Cerrar ventana</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}