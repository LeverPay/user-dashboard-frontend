import React, { useState } from 'react';
import "./Source.css";
import { FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa'; // Import some icons
import Modal from 'react-modal';

function Source() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [network, setNetwork] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [saveNumber, setSaveNumber] = useState(false);
    const [balance, setBalance] = useState(1000); // Assume the user has a balance of 1000 Naira for now
    const [errorMessage, setErrorMessage] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleNetworkChange = (e) => setNetwork(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleSaveNumberChange = (e) => setSaveNumber(e.target.checked);

    const handleSubmit = () => {
        const amountNum = parseFloat(amount);
        if (amountNum > balance) {
            setErrorMessage('Amount entered is greater than balance.');
        } else if (amountNum < 50) {
            setErrorMessage('Amount entered is less than 50 Naira.');
        } else {
            // Proceed with the transaction
            console.log({ network, phoneNumber, amount, saveNumber });
            setErrorMessage('');
            closeModal();
        }
    };

    return (
        <div className="mainDiv">
            <div className="btnDiv">
                <p>Pay Bill</p>
                <div className="buttons-container">
                    <div className="left-buttons">
                        <button type="button" className="button buy-airtime" onClick={openModal}>Airtime</button>
                        <button type="button" className="button buy-data">Data</button>
                        <button type="button" className="button cable-tv">Cable TV</button>

                    </div>
                    <div className="right-buttons">
                        <button type="button" className="button buy-electricity">Electricity</button>
                        <button type="button" className="button internet-subscription">Internet Subscription</button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Airtime Purchase"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Airtime Purchase</h2>
                <div className="form-group">
                    <label htmlFor="network">Network</label>
                    <select id="network" value={network} onChange={handleNetworkChange}>
                        <option value="">Select Network</option>
                        <option value="MTN">MTN</option>
                        <option value="Airtel">Airtel</option>
                        <option value="Glo">Glo</option>
                        <option value="9mobile">9mobile</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount (Naira)</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        id="saveNumber"
                        checked={saveNumber}
                        onChange={handleSaveNumberChange}
                    />
                    <label htmlFor="saveNumber">Save this number for future transactions</label>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="button" className="button submit" onClick={handleSubmit}>Submit</button>
                <button type="button" className="button cancel" onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
}

export default Source;
