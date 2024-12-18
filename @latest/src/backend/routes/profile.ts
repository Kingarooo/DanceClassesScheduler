import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from './../prisma';

export async function profile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/profile/user-info/:userId', {
        schema: {
            params: z.object({
                userId: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { userId } = request.params;

            try {
                // Fetch the user data excluding the password
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profilePic: true,
                        totalAttendance: true,
                        // Add relationships like classes, posts, or other profile data
                        classesAttending: true,
                        classesTeaching: true,
                    },
                });

                if (!user) {
                    return reply.status(404).send({ error: 'User not found.' });
                }

                // Return user data excluding sensitive fields
                return reply.status(200).send({ user });

            } catch (error) {
                console.error('Error fetching profile data:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });

    app.withTypeProvider<ZodTypeProvider>().get('/profile/top-users', {
        handler: async (request, reply) => {
            try {
                const topUsers = await prisma.user.findMany({
                    orderBy: {
                        totalAttendance: 'desc',
                    },
                    select: {
                        id: true,
                        name: true,
                        totalAttendance: true,
                        profilePic: true,
                    },
                    take: 10,
                });
                return reply.status(200).send({ topUsers });
            } catch (error) {
                console.error('Error fetching top users:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });
}