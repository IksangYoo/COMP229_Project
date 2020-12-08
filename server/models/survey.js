let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    title: String,
    description: String,
    published: String
},
{
    collection: "surveys"
});

module.exports = mongoose.model('survey', surveyModel);