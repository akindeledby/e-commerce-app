const mongoose = require('mongoose');
const express = require('express');
const next = require("next") // This is neccessary if you want to run both your frontend and backend/api from the same platform or location.
const cors = require("cors")
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV != "produuction";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

dotenv.config({ path: "./config.env" });

// Middleware
const app = express();
app.use(express.json());

// Use cors for cross platform connectivity
app.use(cors())
app.options("*", cors())

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const PORT = process.env.PORT || 3000;

let server;
nextServer.prepare().then(() => {
  app.get("*", (req, res) => {
    return handle(req, res)
  })

  // app.listen(port, () => {
  //   console.log(`App running on port ${port}...`)
  // })
})