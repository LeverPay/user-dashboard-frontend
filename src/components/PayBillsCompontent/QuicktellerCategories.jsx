import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBillersCategories } from '../../services/apiService';
import './QuicktellerCategories.css';

const QuicktellerCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getBillersCategories();
        setCategories(data); // Adjust based on actual API response structure
      } catch (error) {
        console.error("Error fetching biller categories:", error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="quickteller-categories">
      <h2 className="modalTitle">Quickteller Categories</h2>
      {error && <p className="error">{error}</p>}
      <div className="buttons-container">
        <div className="left-buttons">
          <nav>
            {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <button type="button" className="button category-button">
                  {category.name}
                </button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="right-buttons">
          {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <button type="button" className="button category-button">
                {category.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuicktellerCategories;
