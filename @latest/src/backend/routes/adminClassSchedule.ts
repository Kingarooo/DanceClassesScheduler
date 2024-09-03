import { z } from 'zod';
import fastify, { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';

export async function classSchedule(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/classSchedule', {
    schema: {
      body: z.object({
        name: z.string(),
        style: z.string(),
        description: z.string(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        date: z.coerce.date(),
        teachers: z.array(z.string()).min(1, "At least one teacher is required"),
      }),
    },
    handler: async (request, reply) => {
      const { name, style, description, start, end, date, teachers } = request.body;

      const classSchedule = await prisma.class.create({
        data: {
          name,
          style,
          description,
          start,
          end,
          date,
          teachers: {
            connect: teachers.map((teacher) => ({ id: teacher })),
          },
          participants: {
            connect: [], // Initially set participants as an empty array
          },
        },
      });

      console.log(classSchedule);
      return classSchedule;
    },
  });
}
