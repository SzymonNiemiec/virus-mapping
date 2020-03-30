const UserMeetings = require('../resources/userMeeting/model')
const emailService = require('./emailService')

const emailTemplate = (meetingDate, name, ilness) => {
    return `
    <body link="#00a5b5" vlink="#00a5b5" alink="#00a5b5">
  
    <table class=" main contenttable" align="center" style="font-weight: normal;border-collapse: collapse;border: 0;margin-left: auto;margin-right: auto;padding: 0;font-family: Arial, sans-serif;color: #555559;background-color: white;font-size: 16px;line-height: 26px;width: 600px;">
          <tr>
              <td class="border" style="border-collapse: collapse;border: 1px solid #555559;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;">
                  <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                      <tr>
                          </td>
                      </tr>
                      <tr>
                          <td valign="top" class="side title" style="border-collapse: collapse;border: 0;margin: 0 auto;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;vertical-align: top;background-color: white;border-top: none;text-align:center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0 auto;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="head-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 28px;line-height: 34px;font-weight: bold; text-align: center;">
                                          <div class="mktEditable" id="main_title" style="text-align:center; color: #F24338">
                                              On ${meetingDate} you had contact with ${name}, who got ${ilness}
                                          </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="sub-title" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;padding-top:5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 18px;line-height: 29px;font-weight: bold;text-align: center;">
                                      <div class="mktEditable" id="intro_title">
                                          
Contact the infectious disease hospital in your area
                                      </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="top-padding" style="border-collapse: collapse;border: 0;margin: 0;padding: 5px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;"></td>
                                  </tr>
                                  <tr>
                                      <td class="grey-block" style="border-collapse: collapse;border: 0;margin: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background-color: #fff; text-align:center;">
                                      <div class="mktEditable" id="cta">
                                      <img class="top-image" src="https://s3.xopic.de/openwho-public/channels/7fSc4JEBeO9H0P4b8d1Cfq/logo_v1.png" width="350"/><br><br>
                              
                                      </div>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                          <td valign="top" class="footer" style="border-collapse: collapse;border: 0;margin: 0;padding: 0;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 16px;line-height: 26px;background: #fff;text-align: center;">
                              <table style="font-weight: normal;border-collapse: collapse;border: 0;margin: 0;padding: 0;font-family: Arial, sans-serif;">
                                  <tr>
                                      <td class="inside-footer" align="center" valign="middle" style="border-collapse: collapse;border: 0;margin: 0;padding: 20px;-webkit-text-size-adjust: none;color: #555559;font-family: Arial, sans-serif;font-size: 12px;line-height: 16px;vertical-align: middle;text-align: center;width: 580px;">
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
    </body>`;
  };

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
                html: emailTemplate(meeting.meetingDate,user.name,illness.name)
            }
            await emailService.sendEmail(mailOptions).then((val) => console.log(val))
        }

        return filteredMeetings
    }
}

module.exports = illnessService
