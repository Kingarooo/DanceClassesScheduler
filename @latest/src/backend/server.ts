import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { teachers } from './routes/teacher';
import { registration } from './routes/registration';
import { contactEmail } from './routes/contactsEmail';
import { classSchedule } from './routes/classes';
import { login } from './routes/login';
import { deleteClass } from './routes/deleteClass';
import fastifyCors from '@fastify/cors';
import { createSubscriptionPlan } from './routes/subPlans';
import { userSubscription } from './routes/subUser';
import { joinClass } from './routes/joinClass';
import { fetchParticipants } from './routes/fetchParticipants';
import { profile } from './routes/profile';
// import fastifyJwt,  { FastifyJWT,  } from '@fastify/jwt'
// import fCookie from '@fastify/cookie'

const app = fastify();



// app.register(fastifyJwt, { secret: process.env.JWT_SECRET as string });

// app.decorate('authenticate', async (request, reply) => {
//     try {
//         await request.jwtVerify();
//         request.user = request.user as { id: string; email: string; name:string; newsletter: boolean; isTeacher: boolean; admin: boolean};
//     } catch (err) {
//         reply.send(err);
//     }
// });


app.register(fastifyCors, {
    origin: ['http://18.175.44.162:3306'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    // credentials: true, // Allow credentials if needed
});

//ROTAS
app.register(login);
app.register(registration)
app.register(contactEmail)
app.register(teachers)
app.register(classSchedule)
app.register(deleteClass)
app.register(createSubscriptionPlan)
app.register(userSubscription)
app.register(joinClass)
app.register(fetchParticipants)
app.register(profile)

//SEMPRE AQUI
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.listen({ port: 8080,  host: '0.0.0.0' }).then(() => {
    console.log("Server Running in port 8080");
}
);
