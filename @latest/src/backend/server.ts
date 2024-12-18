import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastifyCors from '@fastify/cors';

// Import your routes
import { registration } from './routes/registration';
import { teachers } from './routes/teacher';
import { contactEmail } from './routes/contactsEmail';
import { classSchedule } from './routes/classes';
import { login } from './routes/login';
import { deleteClass } from './routes/deleteClass';
import { createSubscriptionPlan } from './routes/subPlans';
import { userSubscription } from './routes/subUser';
import { joinClass } from './routes/joinClass';
import { fetchParticipants } from './routes/fetchParticipants';
import { profile } from './routes/profile';
// import fastifyJwt, { FastifyJWT } from '@fastify/jwt';
// import fCookie from '@fastify/cookie';

const app = fastify();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register CORS
app.register(fastifyCors, {
  origin: ['http://13.42.44.149'], // Update to match your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true, // Uncomment if needed
});

// Serve static files (React frontend build)
app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'), // Make sure "public" points to the frontend build
  prefix: '/', // Serve the frontend at the root URL
});

// Handle unmatched routes (for React's SPA routing)
app.setNotFoundHandler((req, reply) => {
  reply.sendFile('index.html'); // Serve React's index.html for all non-API routes
});


// Register routes
app.register(login);
app.register(registration);
app.register(contactEmail);
app.register(teachers);
app.register(classSchedule);
app.register(deleteClass);
app.register(createSubscriptionPlan);
app.register(userSubscription);
app.register(joinClass);
app.register(fetchParticipants);
app.register(profile);

// Add Zod validators
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
import dotenv from 'dotenv';

dotenv.config();
const PORT = 8080;
// Start the server
app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log('Server Running on port 8080');
});
