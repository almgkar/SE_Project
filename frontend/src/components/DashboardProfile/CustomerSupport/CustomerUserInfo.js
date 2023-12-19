import React from 'react';
import CustomerSearchBar from './CustomerSearchBar';

const CustomerUserInfo = ({
  view,
  userData,
  date,
  card,
  items,
  field,
  amount,
  money,
  setMoney,
  handleSearch,
  handlePayClick,
}) => {

  const downloadTranscript = () => {
    const transcript = [
      "User: Hi",
      "Agent: Hello, What can I help you with?",
      "Agent: How would you rate your experience talking to us today?"
    ].join('\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='user-info-container'>
      {view === 'details' && (
        <CustomerSearchBar onSearch={handleSearch} />
      )}

      {userData && view === 'details' && (
        <div className="user-result-container">
          <h3>User Information</h3>
          <div className="user-info-row">
            <div>
              <p>First Name: {userData.first_name}</p>
              <p>Last Name: {userData.last_name}</p>
              <p>Number of items: {items}</p>
              <p>Date: {date} </p>
              <p>Amount Due: ${amount}</p>
            </div>
            <div>
              <p>Username: {userData.user_id}</p>
              <p>Email: {userData.user_id}</p>
              <p>Card: {card} </p>
              <div className="cash-payment-container">
                <input
                  className='cash-input'
                  type="text"
                  placeholder="Enter payment amount"
                  value={money}
                  disabled={amount === 0}
                  onChange={(e) => setMoney(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePayClick(e);
                    }
                  }}
                  inputMode="numeric"
                />
                <button disabled={amount === 0} onClick={handlePayClick}>Pay</button>
              </div>
              <button onClick={downloadTranscript}>Download Chat Transcript</button>
            </div>
          </div>
        </div>
      )}  
    </div>
  );
};

export default CustomerUserInfo;
