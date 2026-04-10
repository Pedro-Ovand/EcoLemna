import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM productos');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar productos" }, { status: 500 });
  }
}