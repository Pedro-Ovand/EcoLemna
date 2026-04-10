import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const [rows]: any = await db.execute(
      'SELECT id, nombre, email, direccion FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const user = rows[0];
    return NextResponse.json({ 
      user: { name: user.nombre, email: user.email, address: user.direccion } 
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}