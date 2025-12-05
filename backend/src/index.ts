import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import routes from './routes/index';
import userRoutes from './routes/userRoutes';
import feedbackRoutes from './routes/feedbackRoutes'; // Import feedback routes

const app = express();
const port = process.env.PORT || 3333;

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Veterinary Clinic API',
      version: '1.0.0',
      description: 'API for managing a veterinary clinic',
    },
    servers: [
      {
        url: 'https://3333-firebase-veterinario-1764686849225.cluster-lr6dwlc2lzbcctqhqorax5zmro.cloudworkstations.dev',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Enable CORS for all origins and methods
app.use(cors({
  origin: '*', // Explicitly allowing all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing all necessary methods
}));

app.use(express.json());

app.use('/api', routes);
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes); // Use feedback routes

app.get('/', (req, res) => {
  res.send('Welcome to the Veterinary Clinic API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
