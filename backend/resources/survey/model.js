const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SurveySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        temperature: {
            type: Number,
            required: false
        },
        cough: {
            type: Boolean,
            required: true
        },
        coughType: {
            type: String,
            enum: ['dry', 'wet'],
            required: false
        },
        breathingProblems: {
            type: Boolean,
            required: true
        },
        tiredness: {
            type: Boolean,
            required: true
        }
    }
)

const Survey = mongoose.model('survey', SurveySchema)

module.exports = Survey
