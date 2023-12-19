import React, { useState } from 'react';
import validator from 'validator';
import './PaymentForm.css';
import {  amountDue, dueDate } from './MakePayment'; 
import userSession from "../LoginSingup/userSession";

  
function PaymentForm() {
  const userNumber = userSession.getUserId()
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const isValidExpiryDate = (date) => {
    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; 
    const currentMonth = currentDate.getMonth() + 1; 

    if (!month || !year || isNaN(month) || isNaN(year)) return false;
    if (Number(month) > 12 || Number(month) < 1) return false;
    if (year.length !== 2) return false;

    if (Number(year) === currentYear && Number(month) < currentMonth) return false;
    if (Number(year) < currentYear) return false;

    return true;
  };

  const isValidCVC = (cvc) => {
    return cvc.length === 3 && !isNaN(cvc);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validator.isCreditCard(cardNumber)) {
      setErrorMessage('Invalid Card Number');
      return;
    }

    if (!isValidExpiryDate(expiryDate)) {
      setErrorMessage('Invalid Expiry date. Use MM/YY format and ensure it is after today.');
      return;
    }

    if (!isValidCVC(cvc)) {
      setErrorMessage('Invalid CVC');
      return;
    }

    try {
      const paymentData = {
        username: [userNumber],
        amount: amountDue,
        cardetails: cardNumber,
      };

      const paymentResponse = await fetch('http://localhost:3001/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment failed');
      }

      const emailData = {
        to: userNumber, // Assuming userNumber is an email
        subject: 'Payment Confirmation',
        text: `Thank you for your payment of $${amountDue}`,
        html: `<h1>Thank you for your payment of $${amountDue}</h1><b>This is your email Confirmation</b>`,
      };

      const emailResponse = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        throw new Error('Email sending failed');
      }

      setErrorMessage('Payment submitted successfully!');
    } catch (error) {
      console.error('Error during payment process:', error);
      setErrorMessage('Payment failed. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Enter Credit Card Details</h2>
      <div className="forms-container">
          <div className="payment-form">
              <form onSubmit={handlePayment}>
                  <input type="text" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <input style={{ marginRight: '10px' }} type="text" placeholder="Expiry MM/YY" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                      <input type="text" placeholder="CVC" value={cvc} onChange={e => setCvc(e.target.value)} />
                  </div>
                  <input type="text" placeholder="Card Holder Name" value={holderName} onChange={e => setHolderName(e.target.value)} />
                  <div>
                      <input type="checkbox" id="saveCard" checked={saveCard} onChange={() => setSaveCard(!saveCard)} />
                      <label htmlFor="saveCard">Save this card for future use</label>
                  </div>
                  <button type="submit">Pay</button>
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="summary-box">
              <h3> Payment Summary</h3>
              <p>User ID: {userNumber}</p>
              <p>Amount Due: ${amountDue}</p>
              <p>Due Date: {dueDate}</p>
          </div>
      </div>
    </div>
  );
}

export default PaymentForm;
