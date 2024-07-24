import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBillersCategories, getBillersByCategoryId } from '../../services/apiService';
import LoadingScreen from "../LoadingPage/LoadingScreen";
import './Paybill.css';
import { useLocalState } from '../../utils/useLocalStorage';
import { BsTelephoneFill } from "react-icons/bs";
import { FaWifi } from "react-icons/fa6";
import electricity from "../../assets/electricity.png";
import flightImage from "../../assets/flight.png";
import transport from "../../assets/transport.png";
import internet from "../../assets/internet.png";
import hotel from "../../assets/hotel.png";
import ticket from "../../assets/ph_ticket-light.png";
import cableTv from "../../assets/cable-tv.png";

const PayBillsComponent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [jwt] = useLocalState('', 'jwt');

  const navigate = useNavigate();

  const [forwardNavigation, setForwardNavigation] = useState(false); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!jwt) {
          throw new Error('Token is undefined');
        }

        setLoading(true); // Start loading immediately
        const data = await getBillersCategories(jwt);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching biller categories:', error);
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    if (jwt) {
      fetchCategories();
    }
  }, [jwt]);

  const specificCategories = [
    { id: 3, name: 'Airtime', path: '/airtime', icon: <BsTelephoneFill style={{ color: 'black' }} /> },
    { id: 63, name: 'Data', path: '/data', icon: <FaWifi style={{ color: 'green' }} /> },
    { id: 1, name: 'Electricity', path: '/electricity', icon: <img src={electricity} alt="Electricity" /> },
    { id: 2, name: 'Cable TV', path: '/cable-tv', icon: <img src={cableTv} alt="Cable TV" /> },
    { id: 5, name: 'Internet', path: '/internet', icon: <img src={internet} alt="Internet" /> },
    { id: 13, name: 'Flight', path: '/flight', icon: <img src={flightImage} alt="Flight" /> },
    { id: 30, name: 'Tickets', path: '/tickets', icon: <img src={ticket} alt="Tickets" /> },
    { id: 11, name: 'Hotel', path: '/hotel', icon: <img src={hotel} alt="Hotel" /> },
    { id: 12, name: 'Transport', path: '/transport', icon: <img src={transport} alt="Transport" /> },
  ];

  const handleCategoryClick = async (categoryId, path) => {
    setForwardNavigation(true);
    setLoading(true); 
    try {
      const billers = await getBillersByCategoryId(jwt, categoryId);
 
      navigate(path); 
    } catch (error) {
      
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunks = chunkArray(specificCategories, 3);

  return (
    <div className="mainDiv">
      {loading && forwardNavigation && <LoadingScreen />} 
      <div className="btnDiv">
        <h2 className="modalTitle">Pay Bills</h2>
        {chunks.map((chunk, index) => (
          <div key={index} className="buttons-row">
            {chunk.map((category) => (
              <button 
                key={category.id}
                type="button"
                className={`button ${category.name.replace(" ", "-").toLowerCase()}`}
                onClick={() => handleCategoryClick(category.id, category.path)}
              >
                <div className="icon">{category.icon}</div>
                <div className="text">{category.name}</div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayBillsComponent;
