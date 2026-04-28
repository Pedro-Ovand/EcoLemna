import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const lowerMsg = message.toLowerCase(); 
    
    // NUEVA RESPUESTA POR DEFECTO: Cuando no entiende nada
    let reply = "Lo siento, no he entendido tu pregunta 🤔. Aún estoy aprendiendo. Puedes preguntarme sobre 'precios', 'envíos' o qué es la 'Lemna'.";

    // Lógica de Inteligencia (Palabras Clave)
    if (lowerMsg.includes("precio") || lowerMsg.includes("cuesta") || lowerMsg.includes("comprar") || lowerMsg.includes("formatos") || lowerMsg.includes("precios")) {
      reply = "Actualmente manejamos precios muy accesibles en MXN. Tenemos la línea de Lemna Minor Cruda (desde $41.21 MXN) y Harina de Lemna (desde $20.61 MXN) en presentaciones de 50g, 500g y 1kg. Además, contamos con un Servicio de Capacitación + Kit por $1,500.00 MXN. ¡Ve a la sección de 'Nuestra Oferta' más abajo para armar tu pedido! 🌿🛒";
    } 
    // ENVÍOS
    else if (lowerMsg.includes("envio") || lowerMsg.includes("envíos") || lowerMsg.includes("envío") || lowerMsg.includes("llega") || lowerMsg.includes("país") || lowerMsg.includes("entrega") || lowerMsg.includes("enviar") || lowerMsg.includes("tiempo de entrega") || lowerMsg.includes("tarda en llegar") || lowerMsg.includes("tiempo de envio") ) {
      reply = "Tenemos Envío Gratis. El pedido llegará directamente a la dirección que guardaste al iniciar sesión. Tarda aproximadamente 48 horas. 🚚";
    } 
    // DEFINICIÓN DE LEMNA (¡AQUÍ ESTÁ LA VERSIÓN A PRUEBA DE BALAS!)
    else if (lowerMsg.includes("lemna") || lowerMsg.includes("que es") || lowerMsg.includes("proteina") || lowerMsg.includes("beneficios")) {
      reply = "La Lemna minor es una planta acuática de estructura minimalista que utiliza su fronde ovalado y su raíz única para optimizar la absorción de nutrientes y el equilibrio en el agua. " + 
              "Este organismo funciona como un bioreactor de alta eficiencia que sintetiza proteínas de gran valor biológico a partir de nitratos y fosfatos, alcanzando niveles proteicos de hasta un 40% en su biomasa seca. " + 
              "Además, la Lemna es una planta de crecimiento extremadamente rápido, lo que la convierte en una fuente sostenible y renovable de nutrición para peces. 🌿🐟";
    }
    // CRECIMIENTO
    else if (lowerMsg.includes("crece") || lowerMsg.includes("crecimiento") || lowerMsg.includes("reproduce") || lowerMsg.includes("duplica") || lowerMsg.includes("tarda en crecer") || lowerMsg.includes("rápido")) {
      reply = "¡Su velocidad te sorprenderá! La Lemna minor tiene una tasa de crecimiento exponencial y es capaz de duplicar su biomasa cada 24 a 48 horas bajo condiciones óptimas de temperatura. 📈🌱";
    }
    // SALUDOS
    else if (lowerMsg.includes("hola") || lowerMsg.includes("buenos") || lowerMsg.includes("buenas") || lowerMsg.includes("hey") || lowerMsg.includes("hello")) {
      reply = "¡Hola, querido amigo! 👋 Soy EcoBot. ¿Qué duda puedo resolverte hoy?";
    }
    // DESPEDIDAS
    else if (lowerMsg.includes("gracias") || lowerMsg.includes("grax") || lowerMsg.includes("thx") || lowerMsg.includes("thank") || lowerMsg.includes("muy amable") || lowerMsg.includes("genial")) {
      reply = "¡De nada! Ha sido un placer. Si necesitas hacer tu pedido, no olvides iniciar sesión primero. 🌿";
    }
    else if (lowerMsg.includes("servicio") || lowerMsg.includes("Costo de servicio") || lowerMsg.includes("Como es el servicio") || lowerMsg.includes("Servicio de capacitacion") || lowerMsg.includes("Capacitacion")) {
      reply = "¡Claro! Nuestro servicio de capacitación tiene un costo de $1500 MXN, esto te incluye 1 Kilo de Lemna Minor cruda o en harina, tambien puede ser medio kilo de ambas (queda a su elección), además de 1 capacitación semanal (4 sesiones al mes) durante un mes, esto incluye Manual técnico en Zapoteco o Náhuatl";
    }
    

    // Simulamos que está escribiendo
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ reply: "Ups, mis circuitos se mojaron. Intenta de nuevo más tarde 🤖💧" }, { status: 500 });
  }
}