import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { toast } from 'react-toastify';

export async function teachers(app: FastifyInstance) {
  // Route to add a new teacher by promoting a user
  app.withTypeProvider<ZodTypeProvider>().put('/lessons/newTeacher', {
    schema: {
      body: z.object({
        email: z.string().email(),
      }),
    },
    handler: async (request, reply) => {
      const { email } = request.body;

      try {
        // Check if the user exists
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          toast.error('User not found. Please check the email.');
          return reply.status(404).send({ error: 'User not found. Please check the email.' });
        }
        // If user is already a teacher, return toast message
        if (user.isTeacher) {
          toast.error('User is already a teacher.');
          return reply.status(400).send({ error: 'User is already a teacher.' });
        }
        // Promote user to teacher
        const updatedUser = await prisma.user.update({
          where: { email },
          data: { isTeacher: true },
        });

        return reply.status(200).send({ message: `User ${updatedUser.email} has been promoted to teacher.` });

      } catch (error) {
        console.error('Error promoting user to teacher:', error);
        return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
      }
    },
  });

  // Backend route to unpromote a teacher (set isTeacher to false)
  app.withTypeProvider<ZodTypeProvider>().put('/lessons/removeTeacher', {
    schema: {
      body: z.object({
        email: z.string().email(),
      }),
    },
    handler: async (request, reply) => {
      const { email } = request.body;

      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.isTeacher) {
          return reply.status(404).send({ error: 'User is not a teacher or does not exist.' });
        }

        const updatedUser = await prisma.user.update({
          where: { email },
          data: { isTeacher: false },
        });

        return reply.status(200).send({ message: `User ${updatedUser.email} is no longer a teacher.` });

      } catch (error) {
        console.error('Error unpromoting user:', error);
        return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
      }
    },
  });

  // Backend route to delete a user
  app.withTypeProvider<ZodTypeProvider>().delete('/lessons/deleteUser', {
    schema: {
      body: z.object({
        email: z.string().email(),
      }),
    },
    handler: async (request, reply) => {
      const { email } = request.body;

      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return reply.status(404).send({ error: 'User not found.' });
        }

        await prisma.user.delete({
          where: { email },
        });

        return reply.status(200).send({ message: `User ${email} has been deleted.` });

      } catch (error) {
        console.error('Error deleting user:', error);
        return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
      }
    },
  });

  // Backend route to fetch all teachers for admin dashboard
  app.withTypeProvider<ZodTypeProvider>().get('/lessons/showTeachers', {
    handler: async (request, reply) => {
      try {
        const teachers = await prisma.user.findMany({
          where: {
            isTeacher: true, // all teachers
          },
          select: {
            id: true,
            name: true,
            email: true
          },
        });

        return reply.status(200).send(teachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
      }
    },
  });


  // Route to fetch teachers associated with a specific class
  // app.withTypeProvider<ZodTypeProvider>().get('/class/:classId/teachers', {
  //   schema: {
  //     params: z.object({
  //       classId: z.string(),
  //     }),
  //   },
  //   handler: async (request, reply) => {
  //     const { classId } = request.params;

  //     try {
  //       // Fetch teachers (users with isTeacher true) for the given class
  //       const teachers = await prisma.user.findMany({
  //         where: {
  //           isTeacher: true,
  //           classesTeaching: {
  //             some: { id: classId },
  //           },
  //         },
  //       });

  //       if (!teachers.length) {
  //         return reply.status(404).send({ message: 'No teachers found for this class.' });
  //       }

  //       return reply.status(200).send(teachers);

  //     } catch (error) {
  //       console.error('Error fetching teachers for class:', error);
  //       return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
  //     }
  //   },
  // });
}
