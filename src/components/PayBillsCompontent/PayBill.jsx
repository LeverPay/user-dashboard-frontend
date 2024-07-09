import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBillersCategories, getBillersByCategoryId } from '../../services/apiService';
import LoadingScreen from "../LoadingPage/LoadingScreen";
import './Paybill.css';
import { useLocalState } from '../../utils/useLocalStorage';

const PayBillsComponent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [jwt] = useLocalState('', 'jwt');

  const navigate = useNavigate();

  const [forwardNavigation, setForwardNavigation] = useState(false); // Track forward navigation

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
        setLoading(false); // Always set loading to false after fetch completes
      }
    };

    if (jwt) {
      fetchCategories();
    }
  }, [jwt]);

  const specificCategories = [
    { id: 68, name: 'Airtime', path: '/airtime' },
    { id: 63, name: 'Data', path: '/data' },
    { id: 5, name: 'Internet Subscription', path: '/internet' },
    { id: 1, name: 'Electricity', path: '/electricity' },
    { id: 2, name: 'Cable TV', path: '/cable-tv' },
  ];

  const handleCategoryClick = async (categoryId, path) => {
    setForwardNavigation(true); // Set forward navigation to true when clicking a category button
    setLoading(true); // Start loading when category button is clicked
    try {
      const billers = await getBillersByCategoryId(jwt, categoryId);
      // console.log(`Billers for category ${categoryId}:`, billers);
      navigate(path); // Navigate after successful API call
    } catch (error) {
      // console.error(`Error fetching billers for category ${categoryId}:`, error);
      setError(error.message);
    } finally {
      setLoading(false); // Ensure loading state is cleared after API call completes
    }
  };

  return (
    <div className="mainDiv">
      {loading && forwardNavigation && <LoadingScreen />} {/* Show loading screen only during forward navigation */}
      <div className="btnDiv">
        <h2 className="modalTitle">Pay Bills</h2>
        {error && <p className="error">{error}</p>}
        <div className="buttons-container">
          <div className="left-buttons">
            <nav>
              {specificCategories.slice(0, Math.ceil(specificCategories.length / 2)).map((category) => (
                <button 
                  key={category.id}
                  type="button"
                  className={`button ${category.name.replace(" ", "-").toLowerCase()}`}
                  onClick={() => handleCategoryClick(category.id, category.path)}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="right-buttons">
            <nav>
              {specificCategories.slice(Math.ceil(specificCategories.length / 2)).map((category) => (
                <button 
                  key={category.id}
                  type="button"
                  className={`button ${category.name.replace(" ", "-").toLowerCase()}`}
                  onClick={() => handleCategoryClick(category.id, category.path)}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayBillsComponent;
