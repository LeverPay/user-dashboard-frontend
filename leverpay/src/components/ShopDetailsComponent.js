import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import "../Styles/Recent-Activities.css";

const ShopDetails = () => {
  return (
    <>
      <p className="my-merchant-text">My Merchant</p>
      <p className="view-more-merchants">
        View More <AiOutlineRight />
      </p>
      <div className="shopDetails">
        <h4 className="shopNow"> Shop Now </h4>
        <h5 className="moreDetails"> More Details</h5>
      </div>
    </>
  );
};

export default ShopDetails;
