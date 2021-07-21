const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/playlist', require('./routes/api/playlist'));
app.use('/api/Oauth2', require('./routes/api/Oauth2'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));