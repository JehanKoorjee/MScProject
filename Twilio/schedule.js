// load environmental variables
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// create a Twilio client
const client = require('twilio')(accountSid, authToken);
// allows us to read xlsx files
var XLSX = require("xlsx");
var workbook = XLSX.readFile("tester.xlsx");
let worksheet = workbook.Sheets[workbook.SheetNames[0]];

/*here the user will need to replace the number 7 on line 17 with the
amount of numbers that they have on their spreadsheet + 2.
This for loop goes through the numbers on the spreadsheet and passes them
into the scheduledSmsInTwilio function if the "if" condition is met */

  for(let i=2; i < 7; i++){
  var phoneNumber = worksheet[`A${i}`].v;
  var numberOfTimes = worksheet[`C${i}`].v;

  if(numberOfTimes >= 2 && numberOfTimes <= 8){
  scheduledSmsInTwilio(phoneNumber, numberOfTimes);
  }
  else{
    console.log("there was an invalid input in the number of times column. The value must be from 2 to 8. Please correct the information for: " + phoneNumber);
  }
  /*numberOfTimes in then passed into a switch statement which calls the
  appropriate functions on each number, setting up the schedule*/
  switch(numberOfTimes){
    case 2:
      break;

    case 3:
      scheduledSmsInTwilioThreeAndFiveAndSeven(phoneNumber, numberOfTimes);
      break;

    case 4:
      scheduledSmsInTwilioFourAndSeven(phoneNumber, numberOfTimes);
      break;

    case 5:
      scheduledSmsInTwilioFive(phoneNumber, numberOfTimes);
      scheduledSmsInTwilioThreeAndFiveAndSeven(phoneNumber, numberOfTimes);
      break;

    case 6:
      scheduledSmsInTwilioSix(phoneNumber, numberOfTimes);
      break;

    case 7:
      scheduledSmsInTwilioThreeAndFiveAndSeven(phoneNumber, numberOfTimes);
      scheduledSmsInTwilioFourAndSeven(phoneNumber, numberOfTimes);
      scheduledSmsInTwilioSeven(phoneNumber, numberOfTimes);
      break;

    case 8:
      scheduledSmsInTwilioEight(phoneNumber, numberOfTimes);
      break;

    default:
    break;
  }
}

//schedules the SMS on Twilio
async function scheduledSmsInTwilio(phoneNumber, numberOfTimes) {

  /*gets the current time and adds 61 minutes to it -->
  sendStartOfDay is then scheduled for 61 minutes after this script runs,
  the same is done for sendEndOfDay which ensures that the last message goes
  out no later than 12 hours after sendStartOfDay*/
  var sendStartOfDay = new Date(new Date().getTime() + 61 * 60000);
  var sendEndOfDay = new Date(new Date().getTime() + 781 * 60000);
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const message = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendStartOfDay,
  });

  console.log(phoneNumber + ": " + message.sid);

  const messageOne = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendEndOfDay,
  });
  console.log(phoneNumber + ": " + messageOne.sid);
}

/*schedules messages for the time that is common
to schedules where numberOfTimes = 3,5 or 7*/
async function scheduledSmsInTwilioThreeAndFiveAndSeven(phoneNumber, numberOfTimes) {

  var sendThreeAndFiveAndSeven = new Date(new Date().getTime() + 421 * 60000);
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const messageTwo = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendThreeAndFiveAndSeven.toISOString(),
  });
  console.log(phoneNumber + ": " + messageTwo.sid);
}

/*schedules messages for the time that is common
to schedules where numberOfTimes = 4 or 7*/
async function scheduledSmsInTwilioFourAndSeven(phoneNumber, numberOfTimes) {

  var sendFourAndSeven = new Date(new Date().getTime() + 301 * 60000);
  var alsoSendFourAndSeven = new Date(new Date().getTime() + 541 * 60000);

  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const messageThree = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendFourAndSeven.toISOString(),
  });

  console.log(phoneNumber + ": " + messageThree.sid);

  const messageFour = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: alsoSendFourAndSeven.toISOString(),
  });

  console.log(phoneNumber + ": " + messageFour.sid);
}

/*schedules messages for the time that is common
to schedules where numberOfTimes = 5 */
async function scheduledSmsInTwilioFive(phoneNumber, numberOfTimes) {

  var sendFive = new Date(new Date().getTime() + 241 * 60000);
  var alsoSendFive = new Date(new Date().getTime() + 601 * 60000);

  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const messageFive = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendFive.toISOString(),
  });

  console.log(phoneNumber + ": " + messageFive.sid);

  const messageSix = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: alsoSendFive.toISOString(),
  });

  console.log(phoneNumber + ": " + messageSix.sid);

}

/*schedules messages for the time that is common
to schedules where numberOfTimes = 6*/
async function scheduledSmsInTwilioSix(phoneNumber, numberOfTimes) {

  var sendSix = new Date(new Date().getTime() + 205 * 60000);
  var sendSixOne = new Date(new Date().getTime() + 349 * 60000);
  var sendSixTwo = new Date(new Date().getTime() + 493 * 60000);
  var sendSixThree = new Date(new Date().getTime() + 637 * 60000);

  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const messageSeven = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendSix.toISOString(),
  });

  console.log(phoneNumber + ": " + messageSeven.sid);

  const messageEight = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendSixOne.toISOString(),
  });

  console.log(phoneNumber + ": " + messageEight.sid);


    const messageNine = await client.messages.create({
        from: messagingServiceSid,
        to: phoneNumber,
        body: 'message1',
        scheduleType: 'fixed',
        sendAt: sendSixTwo.toISOString(),
    });

    console.log(phoneNumber + ": " + messageNine.sid);

      const messageTen = await client.messages.create({
          from: messagingServiceSid,
          to: phoneNumber,
          body: 'message1',
          scheduleType: 'fixed',
          sendAt: sendSixThree.toISOString(),
      });

      console.log(phoneNumber + ": " + messageTen.sid);

}
/*schedules messages for the time that is common
to schedules where numberOfTimes = 7*/
async function scheduledSmsInTwilioSeven(phoneNumber, numberOfTimes) {

  var sendSeven = new Date(new Date().getTime() + 181 * 60000);
  var alsoSendSeven = new Date(new Date().getTime() + 661 * 60000);

  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const messageEleven = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendSeven.toISOString(),
  });

  console.log(phoneNumber + ": " + messageEleven.sid);

  const messageTwelve = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: alsoSendSeven.toISOString(),
  });

  console.log(phoneNumber + ": " + messageTwelve.sid);
}
/*schedules messages for the time that is common
to schedules where numberOfTimes = 8 */
async function scheduledSmsInTwilioEight(phoneNumber, numberOfTimes) {

  var sendEight = new Date(new Date().getTime() + 163 * 60000);
  var sendEightOne = new Date(new Date().getTime() + 265 * 60000);
  var sendEightTwo = new Date(new Date().getTime() + 367 * 60000);
  var sendEightThree = new Date(new Date().getTime() + 469 * 60000);
  var sendEightFour = new Date(new Date().getTime() + 571 * 60000);
  var sendEightFive = new Date(new Date().getTime() + 673 * 60000);

  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const messageThirteen = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendEight.toISOString(),
  });

  console.log(phoneNumber + ": " + messageThirteen.sid);

  const messageFourteen = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendEightOne.toISOString(),
  });

  console.log(phoneNumber + ": " + messageFourteen.sid);

  const messageFifteen = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendEightTwo.toISOString(),
  });

  console.log(phoneNumber + ": " + messageFifteen.sid);

  const messageSixteen = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendEightThree.toISOString(),
  });

  console.log(phoneNumber + ": " + messageSixteen.sid);

  const messageSeventeen = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendEightFour.toISOString(),
  });

  console.log(phoneNumber + ": " + messageSeventeen.sid);

  const messageEighteen = await client.messages.create({
      from: messagingServiceSid,
      to: phoneNumber,
      body: 'message1',
      scheduleType: 'fixed',
      sendAt: sendEightFive.toISOString(),
  });

  console.log(phoneNumber + ": " + messageEighteen.sid);
}
