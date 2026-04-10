import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { user, product, qty, total } = await request.json();

    await db.execute(
      'INSERT INTO pedidos (usuario_nombre, producto_nombre, cantidad, total) VALUES (?, ?, ?, ?)',
      [user, product, qty, total]
    );

    return NextResponse.json({ message: "Pedido guardado en base de datos" });
  } catch (error) {
    return NextResponse.json({ error: "Error al procesar pedido" }, { status: 500 });
  }
}