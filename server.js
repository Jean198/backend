const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const errorHandler = require('./middlewares/errorMiddleware');
mongoose.set('strictQuery', true);
const cookieParser = require('cookie-parser');
const path = require('path');
const contactRoute = require('./routes/contactRoute');

//const expressBusboy = require('express-busboy'); //This helps to send form-data from postman!!!!!!!!!!!!!!!!!!!

//Middlewares
app.set('trust proxy', 1);
//expressBusboy.extend(app); //This helps to send form-data from postman!!!!!!!!!!!!!!!!!!!
//app.use(bodyParser.text({ type: '/' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://wms-app-coral.vercel.app'],
    credentials: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes middleware
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
  res.send('Homepage');
});

//Error middleware
app.use(errorHandler);

//Connect to mongodb and Start server
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, console.log(`Server listening at port ${PORT}`));
});
