require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


// Middleware
app.use(cors(
  {
    // vercel deployment
    origin: ["https://deploy-mern-lwhq.vercel.app"],
    methods:  ['GET', 'POST', 'DELETE'],
    credentials: true

  }
));
app.use(express.json()); // Built-in body parsing middleware

// Routes
const userRoutes = require('./routes/userRoutes'); 
const datasetRoutes = require('./routes/datasetRouters'); 
const dataCategorizationRoutes = require('./routes/dataCategorizationRoutes'); 
const questionRoutes = require('./routes/questionRoutes');


// const postRoutes = require('./routes/postRoutes');
app.use('/api/user', userRoutes);
app.use('/api/datasets', datasetRoutes);
app.use('/api/data-categorizations', dataCategorizationRoutes); 
app.use('/api/questions', questionRoutes);


// app.use('/api/posts', postRoutes);

// TEST ROUTE
const itemRoutes = require('./routes/items'); 
app.use('/api/items', itemRoutes);


// Error handling middleware
// const { errorHandler } = require('./middleware/errorHandlers');
// app.use(errorHandler);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    // Listen to port only after successful DB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});