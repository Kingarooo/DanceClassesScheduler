import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';

export async function deleteClass(app: FastifyInstance) {
  // DELETE route to delete all classes with the same creationGroupId
    app.withTypeProvider<ZodTypeProvider>().delete('/lessons/deleteClass/:creationGroupId', {
        schema: {
            params: z.object({
                creationGroupId: z.string(),
            }),
        },
        handler: async (request, reply) => {
            const { creationGroupId } = request.params;
            console.log('creationGroupId received:', creationGroupId);

            try {
                // Get all classes that share the same creationGroupId
                const toDeleteClasses = await prisma.class.findMany({
                    where: {
                        creationGroupId: creationGroupId,
                    },
                    select: {
                        id: true,
                    },

                });
                for (const toDelete of toDeleteClasses) {
                    await prisma.class.delete({
                        where: {
                            id: toDelete.id,
                        },
                    });
                }

                return reply.status(200).send("Deleted all classes with creationGroupId: " + creationGroupId);
            } catch (error) {
                console.error('Error deleting class schedules:', error);
                return reply.status(500).send({
                    error: 'An internal server error occurred. Please try again later.',
                    message: error.message,
                });
            }
        },
    });
}