import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { toast } from 'react-toastify';
import { endOfMonth, addMonths } from 'date-fns';

export async function userSubscription(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/subscriptions/createUserSubscription', {
        schema: {
            body: z.object({
                email: z.string().email(),
                subscriptionId: z.number().int(),
                monthsPaid: z.number().int().default(1),
                
            }),
        },
        handler: async (request, reply) => {
            const { email, subscriptionId, monthsPaid } = request.body;

            try {
                // Check if the user exists
                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    return reply.status(404).send({ error: 'Email not found. Please check your email and try again.' });
                }

                const subscription = await prisma.subscriptionPlan.findUnique({
                    where: {
                        planId: subscriptionId
                    },
                });

                if (!subscription) {
                    return reply.status(404).send({ error: 'SubscriptionId not found.' });
                }

                const startDate = new Date();
                // Subtract 1 because the first month is included in the current month
                const endDate = endOfMonth(addMonths(startDate, monthsPaid - 1));
                const newSubscription = await prisma.userSubscription.create({
                    data: {
                        userId: user.id,
                        username: user.name,
                        subscriptionPlanId: subscription.planId,
                        monthsPaid,
                        endDate,
                    },
                });

                toast.success(`${user.email} has been subscribed to the ${subscription.name} plan!`);

                return reply.status(200).send({ newSubscription });
            } catch (error) {
                console.error('Error during style subscription:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });

    app.withTypeProvider<ZodTypeProvider>().put('/subscriptions/removeUserSubscriptions', {
        schema: {
            body: z.object({
                email: z.string().email(),
                subscriptionId: z.number().int(),
            }),
        },
        handler: async (request, reply) => {
            const { email, subscriptionId } = request.body;

            try {
                // Check if the user exists
                const user = await prisma.user.findUnique({
                    where: { email },
                });


                if (!user) {
                    return reply.status(404).send({ error: 'Email not found. Please check your email and try again.' });
                }
                
                const removedSubscription = await prisma.userSubscription.update({

                    where: {
                        userId_subscriptionPlanId: {
                            userId: user.id,
                            subscriptionPlanId: subscriptionId,
                        },
                    },
                    data: {
                        subscriptionPlanId: 0,
                    },
                });

                // If the style is updated, return the user's details
                toast.success(`${user.email} has been unsubscribed from the plan!`);

                return reply.status(200).send({ removedSubscription });
            } catch (error) {
                console.error('Error during style subscription:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });

}