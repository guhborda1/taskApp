import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/prisma';

// Defina os rounds de salt para bcrypt a partir de uma variável de ambiente, com fallback para 10
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

// Função para gerar hash de senha
export const saltAndHashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

// Função para comparar senhas
export const comparePasswords = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export async function POST(request: Request) {
    try {
        // Lendo os dados do corpo da requisição
        const { email, password } = await request.json();

        // Validação básica
        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
        }

        // Validação de senha (mínimo de 8 caracteres, pelo menos um número e um caractere especial)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json(
                { message: 'Password must be at least 8 characters long, include a number and a special character.' },
                { status: 400 }
            );
        }

        // Verifica se o usuário já existe
        const existingUser = await db.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return NextResponse.json({ message: 'USER_ALREADY_EXIST' }, { status: 400 });
        }

        // Criptografar a senha
        const hashedPassword = await saltAndHashPassword(password);

        // Criar o usuário no banco de dados
        const newUser = await db.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });

        // Retornar sucesso
        return NextResponse.json(
            { message: 'User created successfully.', userId: newUser.id },
            { status: 201 }
        );
    } catch (err) {
        console.error('Error creating user:', err);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}