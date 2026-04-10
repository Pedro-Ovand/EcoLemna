import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, address } = await request.json();

    const [result]: any = await db.execute(
      'INSERT INTO usuarios (nombre, email, password, direccion) VALUES (?, ?, ?, ?)',
      [name, email, password, address]
    );

    return NextResponse.json({ message: "¡Cuenta y dirección guardadas!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "El email ya existe o error en DB" }, { status: 500 });
  }
}