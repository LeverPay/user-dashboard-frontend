import React, { useEffect, useState } from "react";
import "./Electricity.css";
import axios from "axios";
import { useLocalState } from "../../../utils/useLocalStorage";

const ElectricityComponent = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [electricityCategories, setElectricityCategories] = useState(null);

  useEffect(() => {
    fetchElectricityCategories();
  }, []);

  const fetchElectricityCategories = async () => {
    try {
      const response = await axios.get(
        `https://leverpay-api.azurewebsites.net/api/v1/user/quickteller/get-billers-by-category-id?categoryId=1`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setElectricityCategories(response.data[0].Billers); // Assuming the response has an 'items' field
      console.log("fetch res", response);
    } catch (error) {
      console.error("Error fetching biller items:", error);
    }
  };

  console.log(electricityCategories);

  return (
    <div className="electricity_screen">
      <h1>Buy Electricity and Water</h1>

      <div>
        <div className="electric_grid_cont">
          {electricityCategories &&
            electricityCategories.map((item, index) => (
              <div key={index} className="electric_category">
                {item.Name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ElectricityComponent;
