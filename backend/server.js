const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


//import routes
const userRoute = require('./routes/user');
const maintenanceRequestRoute = require('./routes/maintenanceRequest');

//app midlware
app.use(bodyParser.json());
app.use(cors());

app.use(userRoute);
app.use(maintenanceRequestRoute);

const PORT = 8000;
const DB_URL = 'mongodb+srv://facultymaintenance:fmms123@fmms.zwouah7.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
})
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => console.log('DB connection error', err));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
