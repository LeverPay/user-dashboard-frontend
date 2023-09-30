import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./MerchantComponent.css";
import Merchants from "./Merchants/Merchants";
import Apple from "../../assets/images/apple.png";
import Apple2 from "../../assets/images/apple2.png";
import Nike2 from "../../assets/images/nike2.png";
import Nike from "../../assets/images/nike.png";
import Netflix from "../../assets/images/netflix.png";
import Netflix2 from "../../assets/images/netflix2.png";
import Amazon from "../../assets/images/amazon.png";
import Amazon2 from "../../assets/images/amazon2.png";
export const MerchantComponent = () => {
  return (
    <>
      <div className="col-md-12 merchant-header ">
        <div className="merchant_COn">
          <div className="col-md-12 merchant-header ">
            <h3>My Merchants</h3>
            <span className="merchant_search">
              <SearchBar />
            </span>
            <Link className="details-link up">View All</Link>
          </div>
          <div className="merchant-container col-md-12">
            <div style={{ display: "flex" }}>
              <h5>Shop Now</h5>
              <Link className="details-link">More Details</Link>
            </div>
            <div className="merchants">
              {" "}
              <Merchants logo1={Apple} logo2={Apple2} />
            </div>
            <div className="merchants">
              {" "}
              <Merchants logo1={Nike2} logo2={Nike} />
            </div>
            <div className="merchants">
              {" "}
              <Merchants logo1={Netflix} logo2={Netflix2} />
            </div>
            <div className="merchants">
              <Merchants logo1={Amazon} logo2={Amazon2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
