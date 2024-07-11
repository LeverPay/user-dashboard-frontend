// src/components/EnterPinScreen/EnterPinScreen.jsx

import React, { useState } from 'react';

const EnterPinScreen = () => {
  const [pin, setPin] = useState('');
  const [pinErrorMessage, setPinErrorMessage] = useState('');

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle pin submit logic
  };

  const handleCancel = () => {
    // Handle cancel logic
  };

  return (
    <div>
      <h2>Enter Pin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={pin}
          onChange={handlePinChange}
          placeholder="Enter PIN"
        />
        {pinErrorMessage && <p>{pinErrorMessage}</p>}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EnterPinScreen;
