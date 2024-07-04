// import React, { useState } from 'react';

// import dstv from "../../../assets/dstv.jpeg";
// import gotv from "../../../assets/gotv.jpeg";
// import startTime from "../../../assets/startimes.png";
// import startTime2 from "../../../assets/startimOnimages.png";

// const cableTvData = [
//   { name: 'DSTV', logo: dstv },
//   { name: 'GoTV', logo: gotv },
//   { name: 'StartTime', logo: startTime },
//   { name: 'StartTimeOn', logo: startTime2 },
// ];

// export default function CableTvComponent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCableTv, setSelectedCableTv] = useState(null);
//   const history = useHistory();

//   const filteredCableTv = cableTvData.filter(tv =>
//     tv.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleClick = (cableTv) => {
//     setSelectedCableTv(cableTv);
//     history.push(`/account-details/${cableTv.name}`);
//   };

//   const handleDropdownChange = (e) => {
//     const selectedTv = cableTvData.find(tv => tv.name === e.target.value);
//     setSelectedCableTv(selectedTv);
//     if (selectedTv) {
//       history.push(`/account-details/${selectedTv.name}`);
//     }
//   };

//   return (
//     <div className="mainDiv">
//       <input
//         type="text"
//         placeholder="Search cable TV..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="input"
//       />
//       <div className="networksRow">
//         {filteredCableTv.map(tv => (
//           <button key={tv.name} className="networkButton" onClick={() => handleClick(tv)}>
//             <img
//               src={tv.logo}
//               alt={`${tv.name} Logo`}
//               className={`networkLogo ${selectedCableTv === tv ? 'selected' : ''}`}
//             />
//             <span>{tv.name}</span>
//           </button>
//         ))}
//       </div>
//       <div className="dropdownContainer">
//         <label htmlFor="cableTvDropdown" className="formLabel">Select Cable TV:</label>
//         <select
//           id="cableTvDropdown"
//           value={selectedCableTv ? selectedCableTv.name : ''}
//           onChange={handleDropdownChange}
//           className="input"
//         >
//           <option value="" disabled>Select a provider</option>
//           {cableTvData.map(tv => (
//             <option key={tv.name} value={tv.name}>{tv.name}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }
