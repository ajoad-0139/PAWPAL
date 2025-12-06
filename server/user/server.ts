import express, { Request, Response } from "express";
import config from 'config'
import log from "./src/utils/logger";
import connectDB from "./src/utils/dbConnect";
import cors from 'cors'
import userRoutes from './src/routes/user.route'
import dotenv, { configDotenv } from 'dotenv'
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from 'swagger-ui-express';
import blogRoutes from './src/routes/blogs.route'
import transportRoutes from './src/routes/transport.route'

dotenv.config()

const app = express();
const PORT = config.get<number>('PORT')
const dbUri = config.get<string>('dbUri')
const ip = config.get<string>('ip')
const corsOption = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ['*']
}
const allowedOrigins = [
  "https://pawpalbd.com",
  "https://www.pawpalbd.com"
];
//swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API documentation for user apis'
    },
    servers: [
      {
        url: `http://${ip}:5000/user/api`,
      },
    ],
  },
  apis: ['./src/routes/user.route.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser())
// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

//
app.use('/transport', transportRoutes)
app.use('/blog',blogRoutes)
app.use('/api', userRoutes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
// Start Server
app.listen(PORT, ip, async () => {
  log.info(`Server is running on port ${PORT}`);
  try {
    await connectDB(dbUri)
  } catch (e) {
    log.error(e)
  }
});

