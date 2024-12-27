const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); 
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');  

dotenv.config(); 
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,  
        credentials: true,  
    })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/books', bookRoutes); 


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
