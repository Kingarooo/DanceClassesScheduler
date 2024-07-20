import { z } from 'zod';
import fastify, { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';

export async function classSchedule(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/classSchedule', {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                style: z.string(),
                date: z.coerce.date(),
                class: z.string(),
            }),
        },
        handler: async (request, reply) => { 
            const { name, email, style, date ,class} = request.body;
            const classSchedule = await prisma.class.create({
                data: {
                    name,
                    style,
                    date,
                    teacherId,
                    
                },
            });
            console.log(classSchedule);
            return classSchedule;
        }
    }
    );
}