import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { user, address, total, details } = await request.json();

    if (!user || !address) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios de usuario o dirección" },
        { status: 400 }
      );
    }

    // Comprobamos si el pedido incluye la capacitacion tecnica
    const includesService = typeof details === "string" && details.toLowerCase().includes("capacitaci");

    if (includesService) {
      // Verificamos si en la base de datos este usuario ya tiene registrado el servicio
      const [existingRows]: any = await db.execute(
        "SELECT id FROM pedidos WHERE usuario_nombre = ? AND detalles LIKE ? LIMIT 1",
        [user, "%Capacitaci%"]
      );

      if (existingRows && existingRows.length > 0) {
        return NextResponse.json(
          { error: "Este usuario ya cuenta con la capacitación técnica registrada previamente." },
          { status: 409 }
        );
      }
    }

    // Insercion coincidiendo exactamente con tu tabla pedidos en phpMyAdmin
    await db.execute(
      "INSERT INTO pedidos (usuario_nombre, direccion_envio, total, detalles) VALUES (?, ?, ?, ?)",
      [user, address, total, details]
    );

    return NextResponse.json({ message: "Pedido guardado con éxito en la base de datos" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al registrar el pedido en la base de datos" },
      { status: 500 }
    );
  }
}