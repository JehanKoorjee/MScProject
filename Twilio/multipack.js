//load environmental variables
require('dotenv').config();
//create a Twilio client
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const body = 'how many times a day would you like to be contacted?';
/* insertnumber1 and insertnumber2 are placeholders which are to be
replaced by the user with real phone numbers using the appropriate country code */
const numbers = ['insertnumber1', 'insertnumber2'];
// initiates Twilio  notify service
const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);
// creates a Twilio binding by turning each number into a JSON object
const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });

});

/* service is used to create a notification that will be sent to each of
the bindings */
service.notifications
  .create({
        toBinding: bindings,
        body: body
  })
  .then(notification => {
        console.log(notification);
  })
  .catch(err => {
        console.error(err);
  });
