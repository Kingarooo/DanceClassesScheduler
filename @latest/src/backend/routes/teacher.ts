import { z } from 'zod';
import fastify, { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';
app.withTypeProvider<ZodTypeProvider>().post('/createTeacher', {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        teachingStyle: z.string(),
      }),
    },
    handler: async (request, reply) => {
      const { name, email, password, teachingStyle } = request.body;
  
      const teacher = await prisma.user.create({
        data: {
          name,
          email,
          password,
          isTeacher: true,
          teachingStyle,    
        },
      });
  
      console.log(teacher);
      return teacher;
    },
  });
  

