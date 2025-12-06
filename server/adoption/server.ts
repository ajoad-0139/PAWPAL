import express, { Request, Response } from "express";
import config from 'config'
import log from "./src/utils/logger";
import connectDB from "./src/utils/dbConnect";
import cors from 'cors'
import adoptionRoutes from './src/routes/adoption.route'
import dotenv, { configDotenv } from 'dotenv'
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from 'swagger-ui-express';
import { Server } from 'socket.io';
import http from 'http'
import commentRoutes from './src/routes/comment.route'

dotenv.config()


//configuration
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});
const PORT = config.get<number>('PORT')
const dbUri = config.get<string>('dbUri')
const ip = config.get<string>('ip')
const corsOption = {
  origin: "*",
  methods: ["GET", "POST","PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
      title: 'Adoption API',
      version: '1.0.0',
      description: 'API documentation for adoption apis'
    },
    servers: [
      {
        url: `http://${ip}:5000/adoption/api`,
      },
    ],
  },
  apis: ['./src/routes/adoption.route.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser())
// Routes
app.get("/adoption", (req: Request, res: Response) => {
  res.send("Adoption server working!");
});

app.use('/api', adoptionRoutes)
app.use('/api/comment/', commentRoutes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


//socket

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle joining a post room
  socket.on('joinPost', (postId) => {
    socket.join(postId); // Join the room associated with the post
    console.log(`Client ${socket.id} joined post room: ${postId}`);
  });

  // Handle leaving a post room
  socket.on('leavePost', (postId) => {
    socket.leave(postId); // Leave the room associated with the post
    console.log(`Client ${socket.id} left post room: ${postId}`);
  });

  // Handle new comment
  socket.on('newComment', (commentData) => {
    // Broadcast the new comment only to the specific post room
    console.log('new comment')
    socket.to(commentData.postId).emit('commentAdded', commentData);
  });
  socket.on('typing', ({ postId, name }) => {
    // console.log(`${name} is typing`)
    socket.to(postId).emit('userTyping', {
      name:name
    });
  });
 
  socket.on('deleteComment',({postId})=>{
    console.log('delete')
    socket.to(postId).emit('deleteComment')
  })
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start Server
server.listen(PORT, ip, async () => {
  log.info(`Server is running on port ${PORT}`);
  try {
    await connectDB(dbUri)
  } catch (e) {
    log.error(e)
  }
});

