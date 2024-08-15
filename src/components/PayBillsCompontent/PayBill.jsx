import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBillersCategories, getBillersByCategoryId } from '../../services/apiService';
import LoadingScreen from "../reuseableComponents/LoadingPage/LoadingScreen";
import './Paybill.css';
import { useLocalState } from '../../utils/useLocalStorage';
import electricity from "../../assets/electricity.png";
import flightImage from "../../assets/flight.png";
import transport from "../../assets/transport.png";
import internet from "../../assets/internet.png";
import hotel from "../../assets/hotel.png";
import ticket from "../../assets/ph_ticket-light.png";
import cableTv from "../../assets/cable-tv.png";
import SecuredComponent from "../reuseableComponents/SecuredLogo/SecuredComponent";
import telephone from "../../assets/telephone.png";
import network from "../../assets/network.png";

const PayBillsComponent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [jwt] = useLocalState('', 'jwt');
  const [cache, setCache] = useState({});

  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      if (!jwt) {
        throw new Error('Token is undefined');
      }

      setLoading(true);
      const data = await getBillersCategories(jwt);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching biller categories:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [jwt]);

  useEffect(() => {
    if (jwt && !cache.categories) {
      fetchCategories();
    } else if (cache.categories) {
      setCategories(cache.categories);
    }
  }, [jwt, cache.categories, fetchCategories]);

  const specificCategories = [
    { id: 3, name: 'Airtime', path: '/airtime', icon: <img src={telephone} alt="telephone" /> },
    { id: 4, name: 'Data', path: '/data', icon: <img src={network} alt="network" /> },
    { id: 1, name: 'Electricity', path: '/electricity', icon: <img src={electricity} alt="Electricity" /> },
    { id: 2, name: 'Cable TV', path: '/cable-tv', icon: <img src={cableTv} alt="Cable TV" /> },
    { id: 5, name: 'Internet', path: '/internet', icon: <img src={internet} alt="Internet" /> },
    { id: 13, name: 'Flight', path: '/flight', icon: <img src={flightImage} alt="Flight" /> },
    { id: 30, name: 'Tickets', path: '/tickets', icon: <img src={ticket} alt="Tickets" /> },
    { id: 11, name: 'Hotel', path: '/hotel', icon: <img src={hotel} alt="Hotel" /> },
    { id: 12, name: 'Transport', path: '/transport', icon: <img src={transport} alt="Transport" /> },
  ];

  const handleCategoryClick = async (categoryId, path) => {
    navigate(path);
    setLoading(true);
    try {
      console.log(categoryId);
      if (!cache[categoryId]) {
        const data = await getBillersByCategoryId(jwt, categoryId);
        setCache((prevCache) => ({ ...prevCache, [categoryId]: data }));
      }
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
      {/* {loading && <div className="loading-container"><LoadingScreen /></div>} */}
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
        <div>
          <SecuredComponent />
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default PayBillsComponent;
