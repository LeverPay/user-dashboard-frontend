import React from 'react';
import './AllTransactions.css';

const TransactionTabs = ({ activeTab, setActiveTab }) => {
  return (
    <ul className='transaction-tabs'>
      <li className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>
        All Payment
      </li>
      <li className={activeTab === 'successful' ? 'active' : ''} onClick={() => setActiveTab('successful')}>
        Successful
      </li>
      <li className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
        Pending
      </li>
      <li className={activeTab === 'failed' ? 'active' : ''} onClick={() => setActiveTab('failed')}>
        Failed
      </li>
    </ul>
  );
};

export default TransactionTabs;












// import React from 'react';
// import "./AllTransactions.css";

// const TransactionTabs = ({activeTab, setActiveTab}) =>{
//     return (
//         <ul className='transaction-tabs'>
//                 <li 
//                     className={activeTab === "all" ? 'active' : ""}
//                     onClick={() => setActiveTab('all')}
//                     >
//                     All Payment
//                 </li>
//                 <li 
//                     className={activeTab === "successful" ? 'active' : ""}
//                     onClick={() => setActiveTab('successful')}
//                     >
//                     Successful
//                 </li>
//                 <li 
//                     className={activeTab === "pending" ? 'active' : ""}
//                     onClick={() => setActiveTab('pending')}
//                     >
//                     Pending
//                 </li>
//                 <li 
//                     className={activeTab === "failed" ? 'active' : ""}
//                     onClick={() => setActiveTab('failed')}
//                     >
//                     Failed
//                 </li>
                
//         </ul>
//     )
// }
// export default TransactionTabs;

