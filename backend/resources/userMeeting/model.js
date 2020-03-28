const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserMeetingsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        meetings: [{
            metFriend: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            meetingDate: {
                type: Date
            }
        }]
    }
)

const UserMeetings = mongoose.model('userMeetings', UserMeetingsSchema)

module.exports = UserMeetings
