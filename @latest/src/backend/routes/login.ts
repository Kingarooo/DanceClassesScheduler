import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export async function login(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/login', {
        schema: {
            body: z.object({
                email: z.string().email(),
                password: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { email, password } = request.body;

            try {
                // Check if the user exists
                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    return reply.status(404).send({ error: 'Email not found. Please check your email and try again.' });
                }

                // Check if the password is correct
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return reply.status(401).send({ error: 'Incorrect password. Please check your password and try again.' });
                }

                // If email and password are correct, return the user's name
                return reply.status(200).send({ message: `Welcome back, ${user.name}!`, name: user.name });

            } catch (error) {
                console.error('Error during login:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });
}
