import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
// import dayjs from 'dayjs';
// import { getMailClient } from '../lib/mail';
// import nodemailer from 'nodemailer';

export async function registration(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/registration', {

        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                newPassword: z.string(),
                newsletter: z.boolean().default(true),
                admin: z.boolean().default(false),
            }),
        },
        handler: async (request, reply) => {
            const { name, email, newPassword, newsletter } = request.body;

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
                
                reply.code(201).send(user);
            } catch (error) {
                console.error("Error during user registration:", error);
                reply.code(500).send({ error: 'An error occurred during registration' });
            }

        },

    },);
}



