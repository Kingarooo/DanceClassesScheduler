import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
// import dayjs from 'dayjs';
// import { getMailClient } from '../lib/mail';
// import nodemailer from 'nodemailer';

export async function contactEmail(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/contacts', {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                subject: z.string(),
                message: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { name, email, subject, message } = request.body;

            if (name === null){
                throw new Error('Please Provide Us With a Name To Adress You.')
            }
            if (subject === null) {
                throw new Error('Please Insert a Subject!');
            }

            const content = await prisma.contact.create({
                data: {
                    name,
                    email,
                    subject,
                    content: message,
                },
            });
            
            //reset the form

            console.log(content);
            return content;
        },
    },);
}



