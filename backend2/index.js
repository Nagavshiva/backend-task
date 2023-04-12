const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const usersController = require('./controllers/usersController');

// dotenv config
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error(error));

// Routes
app.get('/users', usersController.getUsers);
app.get('/users/:id', usersController.getUser);
app.post('/users', usersController.createUser);
app.put('/users/:id', usersController.updateUser);
app.delete('/users/:id', usersController.deleteUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
