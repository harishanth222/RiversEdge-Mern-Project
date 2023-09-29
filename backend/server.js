const dotenv = require('dotenv').config()
const express = require('express');
const connectDB = require('./config/connectDB');
const Payment = require('./models/paymentModel');
const paymentRoutes = require('./routes/paymentRoute');


const app = express();
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/addPayment", paymentRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }

}

startServer();