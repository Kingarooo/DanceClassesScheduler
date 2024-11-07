import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { toast } from 'react-toastify';

export async function createSubscriptionPlan(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/subscriptions/getSubscriptionPlans', {
        handler: async (request, reply) => {
            try {
                const subscriptionPlans = await prisma.subscriptionPlan.findMany();
                return reply.status(200).send({ subscriptionPlans });
            } catch (error) {
                console.error('Error fetching subscription plans:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });

    app.withTypeProvider<ZodTypeProvider>().post('/subscriptions/createSubscriptionPlan', {
        schema: {
            body: z.object({
                planId: z.number().int().positive(),
                name: z.string(),
                description: z.string().optional(),
                price: z.number().min(0),
            }),
        },
        handler: async (request, reply) => {
            const { name, description, price, planId } = request.body;

            try {
                // Check if the planId already exists to avoid duplicates
                const existingPlan = await prisma.subscriptionPlan.findUnique({
                    where: { planId },
                });

                if (existingPlan) {
                    return reply.status(400).send({ error: 'A plan with this planId already exists.' });
                }

                // Create the new subscription plan
                const newPlan = await prisma.subscriptionPlan.create({
                    data: {
                        name,
                        description: description ?? '',
                        price,
                        planId,
                    },
                });

                toast.success(`Subscription Plan ${name} created successfully!`);
                return reply.status(201).send({ newPlan });
            } catch (error) {
                console.error('Error creating subscription plan:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });

    app.withTypeProvider<ZodTypeProvider>().delete('/subscriptions/deleteSubscriptionPlan', {
        schema: {
            body: z.object({
                planId: z.number().int().positive(),
            }),
        },
        handler: async (request, reply) => {
            const { planId } = request.body;

            try {
                // Check if the planId exists
                const existingPlan = await prisma.subscriptionPlan.findUnique({
                    where: { planId },
                });

                if (!existingPlan) {
                    return reply.status(404).send({ error: 'Subscription plan not found.' });
                }

                // Update the subscription plan
                const updatedPlan = await prisma.subscriptionPlan.delete({
                    where: { planId },
                });

                toast.success(`Subscription Plan ${updatedPlan.name} deleted successfully!`);
                return reply.status(200).send({ updatedPlan });
            } catch (error) {
                console.error('Error deleting subscription plan:', error);
                return reply.status(500).send({ error: 'An internal server error occurred. Please try again later.' });
            }
        },
    });
}
