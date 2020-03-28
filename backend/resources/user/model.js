const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: false
        },
        registered: {
            type: Boolean,
            required: true
        },
        externalLogins: [{
            loginProvider: {
                type: String,
                enum: ['facebook', 'google'],
            },
            providerKey: {
                type: String,
            }
        }],
        picture: {
            type: String,
            required: false
        },
        illnesses: {
            name: {
                type: String,
                enum: ['COVID-19']
            },
            illnessDate: {
                type: Date
            }
        }
    }
)

const User = mongoose.model('user', UserSchema)

module.exports = User
