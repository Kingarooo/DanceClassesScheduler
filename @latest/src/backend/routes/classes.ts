import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from './../prisma';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export async function classSchedule(app: FastifyInstance) {

  // POST route to create a class schedule
  app.withTypeProvider<ZodTypeProvider>().post('/lessons/classSchedule', {
    schema: {
      body: z.object({
        name: z.string(),
        description: z.string(),
        style: z.string(),
        start: z.string(), // (ISO 8601)
        end: z.string(),
        frequency: z.string(),
        teachers: z.array(z.string()),
        creationGroupId: z.string().optional(),
      }),
    },
    handler: async (request, reply) => {
      const { name, description, style, start, end, frequency, teachers, creationGroupId } = request.body;

      try {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const finalCreationGroupId = creationGroupId || uuidv4();

        const classSchedule = await prisma.class.create({
          data: {
            name,
            description,
            style,
            start: startDate,
            end: endDate,
            frequency,
            teachers: {
              create: teachers.map((teacherId) => ({
                user: { connect: { id: teacherId } }, // Connect the teacher to the class using ID
              })),
            },
            creationGroupId: finalCreationGroupId,
          },
        });

        return reply.status(201).send(classSchedule);
      } catch (error) {
        console.error('Error creating class schedule:', error);
        return reply.status(500).send("Error creating class");
      }
    },
  });

  // GET route to retrieve all class schedules
  app.withTypeProvider<ZodTypeProvider>().get('/lessons/classSchedule', async (request, reply) => {
    try {
      const classes = await prisma.class.findMany({
        include: {
          teachers: {
            select: {
              user: true,
            },
          },
        },
      });

      const formattedClasses = classes.map((classSchedule) => ({
        id: classSchedule.id,
        name: classSchedule.name,
        start: moment(classSchedule.start).toDate(),
        end: moment(classSchedule.end).toDate(),
        // start: classSchedule.start.toISOString(),
        // end: classSchedule.end.toISOString(),
        data: {
          description: classSchedule.description,
          style: classSchedule.style,
          frequency: classSchedule.frequency,
          teachers: classSchedule.teachers.map((teacher) => teacher.user.id),
          creationGroupId: classSchedule.creationGroupId,
        }
      }));
      console.log('Classes:', formattedClasses);
      return reply.status(200).send(formattedClasses);
    } catch (error) {
      console.error('Error fetching class schedules:', error);
      return reply.status(500).send('An internal server error occurred. Please try again later.');
    }
  });
}
