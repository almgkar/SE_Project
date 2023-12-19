
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import "./MakePayment.css";
import userSession from "../LoginSingup/userSession";

export const getRandomAmount = () => Math.floor(Math.random() * 30) + 1;

function MakePayment() {
  let navigate = useNavigate();
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [selectedCard, setSelectedCard] = useState(""); // Added state to hold the selected card
  const [showQRCode, setShowQRCode] = useState(false);
  const qrRef = useRef(null);

  const navigateToPaymentForm = () => {
    navigate("/Payments");
  };

  const handleSavedCardsClick = () => {
    setShowCardDropdown(!showCardDropdown);
  };

  const handlePayWithCash = () => {
    setShowQRCode(!showQRCode);
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "payment-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const amountDue = 5; // Get a random amount between 1 and 30
  const userNumber = userSession.getUserId(); // Get user ID from userSession
  const qrData = `Amount: $${amountDue}, User Number: ${userNumber}`; // Define qrData here

  const handlePayment = async () => {
    // const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    try {
      // Perform the payment operation
      const paymentResponse = await fetch('http://localhost:3001/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userNumber,
          amount: amountDue,
          cardetails: selectedCard, // Use the selected card details
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment failed');
      }

      const paymentData = await paymentResponse.json();

      // If payment is successful, send an email confirmation
      const emailResponse = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userNumber, 
          subject: 'Payment Confirmation',
          text: `Thank you for your payment of $${amountDue}`,
          html: `<h1>Thank you for your payment of $${amountDue}</h1><b>This is your email confirmation</b>`,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Email sending failed');
      }

      const emailData = await emailResponse.json();
      console.log('Payment successful', paymentData);
      console.log('Email sent successfully', emailData);

      // Update the UI or state as necessary to reflect successful payment and email sending

    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  return (
    <div className="payment-container">
      <div className="header">
        <h1 className="customer-text">Hello User: {userNumber}</h1>
      </div>
      <h2 className="customer-text">Payment Summary</h2>
      <p>Amount Due: ${amountDue}</p>
      <p>Due Date: 2023-12-31</p>

      <h3 className="customer-text">Pay With</h3>
      <div>
        <button className="payment-button" onClick={handlePayWithCash}>
          Pay with Cash
        </button>
        <button className="payment-button" onClick={handleSavedCardsClick}>
          Pay with Saved Cards
        </button>
        <button className="payment-button" onClick={navigateToPaymentForm}>
          Pay with New Card
        </button>
      </div>

      {showQRCode && (
        <div ref={qrRef}>
          <QRCode value={qrData} size={256} />
          <p>
            Take this QR to the Front Desk: Monroe County Library,3310 Freguson Ave, Bloomington,IN.
          </p>
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}

      {showCardDropdown && (
        <div>
          <label htmlFor="savedCards">Select a Card:</label>
          <select className="saved-cards" id="savedCards" onChange={(e) => setSelectedCard(e.target.value)}>
            <option value="card1"> XXXXXXXXXXX3456</option>
            <option value="card2"> XXXXXXXXXXX4567</option>
            <option value="card3">XXXXXXXXXXX5678</option>
          </select>
          <br />
          <button onClick={handlePayment}>Pay</button>
        </div>
      )}
    </div>
  );
}



export const userNumber = userSession.getUserId();
export const amountDue = 5;
export const dueDate = "2023-12-31";
export default MakePayment;
