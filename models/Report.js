const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const ReportSchema = new mongoose.Schema({
   location: {
          type: {
            type: String,
            enum: ['Point'],
          },
          coordinates: {
            type: [Number],
            index: '2dsphere',
            required: true
          },
          formattedAddress: String
    },
    crowdedness: {
        type: Number,
        min: [1, "Crowdedness has to be a number between 1 and 5"],
        max: [5,"Crowdedness has to be a number between 1 and 5"],
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Report', ReportSchema);