import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';

export async function registration(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/registration', {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                newPassword: z.string(),
                newsletter: z.boolean(),
            }),
        },
        handler: async (request, reply) => {
            const { name, email, newPassword, newsletter} = request.body;

            try {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                // Create user in the database
                const user = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                        newsletter,
                    },
                });

                // Exclude the password from the response
                const { password: _, ...userWithoutPassword } = user;

                toast.success(`Welcome, ${name}!`);
                reply.code(201).send({ user: userWithoutPassword });
            } catch (error) {
                console.error("Error during user registration:", error);
                reply.code(500).send({ error: 'An error occurred during registration' });
            }
        },
    });

    app.withTypeProvider<ZodTypeProvider>().delete('/registration/delete/:userId', {
        schema: {
            params: z.object({
                userId: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { userId } = request.params;

            try {
                        await prisma.user.delete({
                    where: { id: userId },
                });

                toast.success('User deleted successfully');
                reply.code(200).send({ message: 'User deleted successfully' });
            } catch (error) {
                console.error('Error deleting user:', error);
                reply.code(500).send({ error: 'An error occurred while deleting the user' });
            }
        },
    });
}
