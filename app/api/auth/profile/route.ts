import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    // Recibimos los datos nuevos y el correo original para saber a quién actualizar
    const { originalEmail, name, email, address, password } = await request.json();

    // Lógica de Senior: Si el usuario escribe una contraseña nueva, la actualizamos. 
    // Si la deja en blanco, solo actualizamos el nombre, correo y dirección.
    if (password) {
      await db.execute(
        'UPDATE usuarios SET nombre = ?, email = ?, direccion = ?, password = ? WHERE email = ?',
        [name, email, address, password, originalEmail]
      );
    } else {
      await db.execute(
        'UPDATE usuarios SET nombre = ?, email = ?, direccion = ? WHERE email = ?',
        [name, email, address, originalEmail]
      );
    }

    return NextResponse.json({ message: "¡Perfil actualizado con éxito!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error actualizando perfil:", error);
    return NextResponse.json({ error: "No se pudo actualizar el perfil" }, { status: 500 });
  }
}