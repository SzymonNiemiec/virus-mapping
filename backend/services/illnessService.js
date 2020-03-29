const UserMeetings = require('../resources/userMeeting/model')
const emailService = require('./emailService')

asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const illnessService = {
    sendAlerts: async (illness, userId) => {
        const userMeetings = await UserMeetings
            .findOne({ user: userId })
            .populate('meetings.metFriend', '-friends -__v')
            .populate('user', '-friends')
            .exec()

        const user = userMeetings.user
        const meetings = userMeetings.meetings

        meetings.sort((a, b) => (a.meetingDate < b.meetingDate) ? 1 : -1)

        const seen = new Set();
        const filteredMeetings = meetings.filter(meeting => {
            const duplicate = seen.has(meeting.metFriend.email);
            seen.add(meeting.metFriend.email);
            return !duplicate;
        });

        for (const meeting of filteredMeetings) {
            const mailOptions = {
                to: meeting.metFriend.email,
                subject: 'Epidemiological alert',
                text: `On ${meeting.meetingDate}, you had contact with ${user.name} who got ${illness.name}.`,
            }
            await emailService.sendEmail(mailOptions).then((val) => console.log(val))
        }

        return filteredMeetings
    }
}

module.exports = illnessService
