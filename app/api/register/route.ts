// src/app/api/handler/route.ts

import { NextResponse } from 'next/server';

type ResponseData = {
    message: unknown;
};

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json(); // Lendo os dados do corpo da requisição
        console.log({ email, password });

        return NextResponse.json({ message: 'Hello from Next.js!' }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Método inválido!' }, { status: 400 });
}
