import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { connect } from 'http2';

export async function joinClass(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/class/joinClass/:id/:userId', {
        // onRequest: [app.authenticate], // Ensure user is authenticated
        schema: {
            params: z.object({
                id: z.string(),
                userId: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { id, userId } = request.params;

            // const userId = (request.user as { id: string }).id;
            try {

                // Add the user to the class participants
                const updatedClass = await prisma.classOnParticipants.create({
                    data: {
                        classId: id,
                        userId,
                        // user: {
                        //     connect: {
                        //         id: userId
                        //     }
                        // },
                        // class: {
                        //     connect: {
                        //         id: classId
                        //     }
                        // }
                    }
                });

                return reply.status(200).send({ message: 'Joined class successfully!', class: updatedClass });
            } catch (error) {
                console.error('Error joining class:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });

    app.withTypeProvider<ZodTypeProvider>().delete('/class/deleteParticipant/:id/:userId)', {
        schema: {
            params: z.object({
                id: z.string(),
                userId: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { id, userId } = request.params;

            try {
                await prisma.classOnParticipants.delete({
                    where: {
                        userId_classId: {
                            classId: id,
                            userId
                        }
                    }
                });

                return reply.status(200).send({ message: 'Left class successfully!' });
            } catch (error) {
                console.error('Error leaving class:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });
}
