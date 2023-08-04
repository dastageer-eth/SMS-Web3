const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const accountSid = 'AC9f5abf5867817092d49fd82e6d4589a9'; 
const authToken = '740efb22182d6c3ce9d9e992657a3e94'; 
const client = new twilio(accountSid, authToken); 

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/send-text", (req, res) => {
  const { recipient, message } = req.query;
  client.messages 
      .create({ 
         body: message,  
         messagingServiceSid:'MG427dd24ad3ff588f08c9be536b7bf4b2',
         to: "+91" + recipient,
        //  from: "+12184004665",      
       }) 
      .then(message => console.log(message.body))
      .done();
});

app.listen(4000, () => {
  console.log("Listening");
});
