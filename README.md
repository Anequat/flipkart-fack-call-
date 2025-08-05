


issko likhne ka man nhi tha to chat gpt se likhvaya hai ache se padho phir eciqute kerna   









# 📞 Hindi Voice Call Order Confirmation System (Twilio + Node.js)

This project is a Node.js-based automated voice call system using Twilio that delivers a **Hindi-language interactive voice message**. It allows users to press keys to confirm or cancel a fake order. Ideal for demos, educational purposes, or simulation of professional IVR call flows.

---

## 🔧 Requirements

- Node.js (v14 or higher)
- npm (Node Package Manager)
- [Ngrok](https://ngrok.com/) (for exposing localhost to public)
- Twilio Account (with a verified phone number & voice-enabled number)
- Internet access

---

## 📦 Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/voice-order-call.git
   cd voice-order-call

    Install Dependencies:

npm install

Set Up Ngrok:
If you don’t have ngrok:

unzip ngrok-stable-linux-amd64.zip
sudo mv ngrok /usr/local/bin/
chmod +x /usr/local/bin/ngrok

Then start a tunnel:

ngrok http 5000

Configure Twilio:

Edit server.js and replace:

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioNumber = '+1XXXXXXXXXX'; // Your Twilio number

Also replace the url in the call with your public ngrok URL:

    url: "https://your-ngrok-subdomain.ngrok-free.app/voice"

▶️ Usage

    Start the Server:

node server.js

Trigger a Call to a User:
Open this in your browser or Postman:

    http://localhost:5000/call-user?to=+91XXXXXXXXXX

📞 Call Flow

    A professional-sounding voice in Hindi says:

        नमस्ते, आपकी बात फ्लिपकार्ट टीम से हो रही है...

    Press 1 → Confirms order

    Press 2 → Prompts for a 4-digit cancellation code

    Any other key → Asks to retry

✅ Features

    Hindi TTS voice using Twilio (or Amazon Polly Aditi)

    DTMF input support (1 or 2 or 4-digit code)

    Call initiated programmatically

    Easy local testing with ngrok

    Built with clean, beginner-friendly Node.js code

⚠️ Disclaimer

This project is strictly for educational and ethical use.
⚠️ Do not use it for spam, fraud, or to deceive real users.
Always comply with laws and obtain consent when calling people.

