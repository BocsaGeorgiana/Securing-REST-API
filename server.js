require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err)); 



// Routes(It tells Express that any request starting with /api/auth 
// should be handled by the authentication routes defined in routes/auth.js.)
app.use('/api/auth', require('./routes/auth'));


// Protected route using auth middleware
const authMiddleware = require('./middleware/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'This is a protected rouute', user: req.user.email });
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
