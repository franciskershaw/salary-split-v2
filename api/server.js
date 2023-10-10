import express from 'express';
import connectDb from './src/config/db';
import 'colors';
import { errorHandler } from './src/middleware/errorMiddleware';
import userRoutes from './src/routes/userRoutes';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Possibly need cookie parser, check back on this one

// Routes
app.use('/api/users', userRoutes);

// Error handler
app.use(errorHandler);

// Welcome message
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Salary Split API' });
});

// Connect to DB, then if successful listen for app
connectDb()
  .then(() => {
    app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}\n`
          .yellow,
        '-----------------------------------------------------------'.yellow
      )
    );
  })
  .catch((err) => {
    console.error(
      `Error connecting to MongoDB: ${err.message}`.red.underline.bold
    );
    process.exit(1);
  });
