import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from './../prisma';

export async function fetchParticipants(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/class/showParticipants/:classId', {
        schema: {
            params: z.object({
                classId: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { classId } = request.params;

            try {

                const classParticipants = await prisma.classOnParticipants.findMany({
                    where: {
                        classId
                    },
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                });

                return reply.status(200).send(classParticipants);
            } catch (error) {
                console.error('Error displaying class participants:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });
}
