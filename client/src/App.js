import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Vonage from "@vonage/server-sdk";
import twilio from "twilio";
import ABI from "./metadata/abi.json";
import "./App.css";

const App = () => {
  const address = "0x453CFb337B0DF13d4b049C8A24278E375CB2C9B2";
  const [messages, setMessages] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const from = "Vonage APIs";
  const to = "919021731957";

  // const accountSid = "AC7f66648cef54c0fa9af22bab87ffad07";
  // const authToken = "9b1a450f0e5767d8de164011887cd840";
  // const phoneNumber = "+919021731957";

  const vonage = new Vonage({
    apiKey: "fd737063",
    apiSecret: "azpczaxkTi0EYj0y",
  });

  // const sendSms = (phone, message) => {
  //   const client = twilio(accountSid, authToken);
  //   client.messages
  //     .create({
  //       body: message,
  //       from: "+15592723968",
  //       to: phone,
  //     })
  //     .then((message) => console.log(message.sid));
  // };

  const setMessage = async () => {
    if (!window.etherum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      let smsContract = new ethers.Contract(address, ABI, signer);
      let sms = smsContract.connect(signer);
      sms.setMessage(messages.toString());
    } else {
    }
  };

  const getMessage = async () => {
    if (!window.etherum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      let smsContract = new ethers.Contract(address, ABI, signer);
      let sms = smsContract.connect(signer);
      let text = await sms.getMessage();
      console.log(text);
      //sendSms(phoneNumber, text)

      fetch(
        `http://localhost:4000/send-text?recipient=${phoneNumber}&message=${text}`
      ).catch((err) => console.log(err));
      
    } else {
    }
  };

  return (
    <div className="App">
      <div>
        <input
          placeholder="Type a Message"
          value={messages}
          input="text"
          onChange={(e) => {
            setMessages(e.target.value);
          }}
        />
        <button onClick={setMessage}> Set</button>
      </div>
      <div>
        <input
          placeholder="Enter Mobile Number"
          value={phoneNumber}
          input="number"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button onClick={getMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
