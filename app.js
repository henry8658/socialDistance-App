const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

//load env variables 
dotenv.config({ path: './config/config.env'});
const port = process.env.PORT;

app.use(express.urlencoded({
    extended: true
}));

// Body Parser 
app.use(express.json());

// Enable cors
app.use(cors());

// Router for API
app.use('/report/v1', require('./routers/router'));

app.listen(port, () => console.log(`Running on Port ${port}!`));