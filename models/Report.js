const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const ReportSchema = new mongoose.Schema({
    crowdedness: {
        type: Number,
        min: [1, "Crowdedness has to be a number between 1 and 5"],
        max: [5,"Crowdedness has to be a number between 1 and 5"],
        required: true
    },
    address: {
        type: String,
        required: [true, 'please enter an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
        formattedAddress: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

ReportSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Report', ReportSchema);