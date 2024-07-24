import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
// import dayjs from 'dayjs';
// import { getMailClient } from '../lib/mail';
// import nodemailer from 'nodemailer';

export async function registration(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/registration', {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string(),
                passwordConfirmation: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { name, email, password, passwordConfirmation } = request.body;

            if (password !== passwordConfirmation) {
                throw new Error('Password and password confirmation do not match');
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });
            console.log(user);
            return user;
        },
    },);
}



