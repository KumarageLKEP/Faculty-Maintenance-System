const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 8000;
const DB_URL = 'mongodb+srv://kavinda:kavinda899@facultymaintenanceapp.enli1ql.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => console.log('DB connection error', err));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
