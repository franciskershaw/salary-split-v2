import express from 'express';
import connectDb from './config/db';
import 'colors';

const PORT = process.env.PORT;

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Possibly need cookie parser, check back on this one

// Routes

// Error handler

// Welcome message

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
