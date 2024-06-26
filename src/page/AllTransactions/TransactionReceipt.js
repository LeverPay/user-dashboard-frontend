import React from "react";

import Logo from "../../assets/LeverpayLogo_Blue.png"

const TransactionReceipt = ({isOpen, onClose, transaction}) => {
    if (!isOpen) return null;

    return (
        <div className="transaction-modal-overlay">
            <div className="transaction-modal">
                <span className="close-button" onClick={onClose}>X</span>
                <img src={Logo} alt=""/>
                <h3>Transaction Receipt</h3> 
                <li className="receipt-amount">N{Number(transaction.amount).toFixed(2)}</li>
                <li className="receipt-status">{transaction.status === 0 ? 'Pending' : transaction.status === 1 ? 'Successful' : 'Failed'}</li>
                <li className="receipt-date">{new Date(transaction.created_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(' at', ',')}</li>
                <hr style={{width: "100%", color: "#082E88"}}/>
                <table className="transaction-details">
                    <tr>
                        <td>Transaction Name</td>
                        <td>{transaction.merchant}</td>
                    </tr>
                    <tr>
                        <td>Recipient Details</td>
                        <td>{transaction.recipient}</td>
                    </tr>
                    <tr>
                        <td>Sender Details</td>
                        <td>{transaction.sender}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{transaction.status === 0 ? 'Pending' : transaction.status === 1 ? 'Successful' : 'Failed'}</td>
                    </tr>
                    <tr>
                        <td>Reference No</td>
                        <td>{transaction.reference_no}</td>
                    </tr>
                </table>
                <div className="transaction-support">
                    <h3>Support</h3>
                    <span>contact@leverpay.io</span>
                    <span> +2349060898687 </span>
                </div>
                <hr style={{width: "100%", backgroundColor: "#082E88"}}/>
                <div className="transaction-footer">
                    Enjoy cheap transaction using leverpay anytime 
                    anywhere around the world! Thank You.
                    
                </div>
            </div>
        </div>
    )
}  

export default TransactionReceipt;