import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import itemRoutes from './routes/itemRoutes.js';

// Initialize express app
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = "mongodb+srv://admin:123@cluster0.34bnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log('Attempting to connect to MongoDB...');
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error details:', err);
    
  });


// Routes
app.use('/api/items', itemRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});