import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message || "";
    const lowerMsg = message.toLowerCase(); 
    
    // Respuesta por defecto cuando no se detecta una intencion conocida
    let reply = "Lo siento, no he entendido tu pregunta. Aún estoy aprendiendo. Puedes preguntarme sobre 'precios', 'envíos' o qué es la 'Lemna'.";

    // Consulta sobre precios y catalogo de productos
    if (
      lowerMsg.includes("precio") || 
      lowerMsg.includes("cuesta") || 
      lowerMsg.includes("comprar") || 
      lowerMsg.includes("formatos") || 
      lowerMsg.includes("precios") ||
      lowerMsg.includes("producto") ||
      lowerMsg.includes("productos") ||
      lowerMsg.includes("cuanto vale") ||
      lowerMsg.includes("costo")
    ) {
      reply = "Actualmente manejamos precios directos en MXN: Harina de Lemna en presentación de 50g por $51.63 MXN y nuestro Servicio de Capacitación más Kit de Cultivo por $1,500.00 MXN. Puedes consultar los detalles y armar tu pedido en la sección de 'Nuestra Oferta'.";
    } 
    // Politicas de envio y tiempos de entrega
    else if (
      lowerMsg.includes("envio") || 
      lowerMsg.includes("envios") || 
      lowerMsg.includes("envío") || 
      lowerMsg.includes("envíos") || 
      lowerMsg.includes("llega") || 
      lowerMsg.includes("país") || 
      lowerMsg.includes("pais") || 
      lowerMsg.includes("entrega") || 
      lowerMsg.includes("enviar") || 
      lowerMsg.includes("tiempo de entrega") || 
      lowerMsg.includes("tarda en llegar") || 
      lowerMsg.includes("tiempo de envio") ||
      lowerMsg.includes("tiempo de envío")
    ) {
      reply = "Tenemos Envío Gratis. El pedido llegará directamente a la dirección registrada en tu perfil de usuario. El tiempo estimado de entrega es de aproximadamente 48 horas hábiles.";
    } 
    // Definicion tecnica y beneficios de Lemna Minor
    else if (
      lowerMsg.includes("que es") || 
      lowerMsg.includes("qué es") || 
      lowerMsg.includes("proteina") || 
      lowerMsg.includes("proteína") || 
      lowerMsg.includes("beneficios")
    ) {
      reply = "La Lemna minor es una planta acuática con hasta un 40% de proteína vegetal. Es un alimento natural, altamente digerible y sostenible para optimizar la nutrición de tus peces.";
    }
    // Tasa de crecimiento y multiplicacion biologica
    else if (
      lowerMsg.includes("crece") || 
      lowerMsg.includes("crecimiento") || 
      lowerMsg.includes("reproduce") || 
      lowerMsg.includes("duplica") || 
      lowerMsg.includes("tarda en crecer") || 
      lowerMsg.includes("rapido") || 
      lowerMsg.includes("rápido")
    ) {
      reply = "Su velocidad de desarrollo es sobresaliente: la Lemna minor presenta una tasa de crecimiento exponencial y es capaz de duplicar su biomasa cada 24 a 48 horas bajo condiciones óptimas de luz, temperatura y nutrientes.";
    }
    // Saludos de cortesia
    else if (
      lowerMsg.includes("hola") || 
      lowerMsg.includes("buenos") || 
      lowerMsg.includes("buenas") || 
      lowerMsg.includes("hey") || 
      lowerMsg.includes("hello")
    ) {
      reply = "Hola. Soy EcoBot, el asistente técnico de EcoLemna. ¿En qué duda o requerimiento puedo apoyarte hoy?";
    }
    // Agradecimientos y cierre
    else if (
      lowerMsg.includes("gracias") || 
      lowerMsg.includes("grax") || 
      lowerMsg.includes("thx") || 
      lowerMsg.includes("thank") || 
      lowerMsg.includes("muy amable") || 
      lowerMsg.includes("genial")
    ) {
      reply = "De nada. Es un placer ayudarte. Recuerda que para realizar tu pedido es importante registrar o verificar tu dirección de envío en la sección Mi Perfil.";
    }
    // Servicio de capacitacion y asesoria tecnica
    else if (
      lowerMsg.includes("servicio") || 
      lowerMsg.includes("costo de servicio") || 
      lowerMsg.includes("como es el servicio") || 
      lowerMsg.includes("cómo es el servicio") || 
      lowerMsg.includes("servicio de capacitacion") || 
      lowerMsg.includes("servicio de capacitación") || 
      lowerMsg.includes("capacitacion") || 
      lowerMsg.includes("capacitación") ||
      lowerMsg.includes("taller") ||
      lowerMsg.includes("kit")
    ) {
      reply = "Nuestro servicio de capacitación tiene un costo de $1,500.00 MXN. Incluye 1 kilo de Lemna minor (cruda o en harina a elegir, o 500g de ambas), manual técnico especializado en Zapoteco o Náhuatl, y 1 sesión semanal de capacitación técnica (4 sesiones al mes).";
    }

    // Simulacion de latencia natural del asistente
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { reply: "Ocurrió un error interno al procesar tu solicitud. Por favor intenta nuevamente más tarde." }, 
      { status: 500 }
    );
  }
}