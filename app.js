const express = require('express');
const app = express();
const validate = require('validate.js');
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.post('/report', (req, res) => 
{
    console.log(req.body.coordinate[0]);
    console.log(req.body.coordinate[1]);
    var validation = validate({crowdedness: req.body.crowdedness}, constraints);
    if (!validation) {
        console.log(validation);
    } else {
    }
    res.send('Thank you for your report!');
});

// validation requirement for crowdedness
var constraints = {
    crowdedness: {
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            lessThanOrEqualTo: 5,
            presence: {message: "Crowdedness has to be a number between 1 and 5"}
        }
    }
}

app.listen(port, () => console.log(`Running on Port ${port}!`));