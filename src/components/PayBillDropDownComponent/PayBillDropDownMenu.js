import React from "react";
import { NavLink } from "react-router-dom";
import "./PayBillDropDownMenu.css"; // Assuming CSS file is correctly named

const PayBillDropDown = ({ showDropdown, closeMobileMenu }) => {
    return (
        <li className={`nav-item ${showDropdown ? "dropdown show" : "dropdown"}`}>
            {showDropdown && (
                <div className="dropdown-menu show">
                    <div className="dropdown-header">
                        <p>Choose a Source</p>
                    </div>
                    <NavLink to="/sourcePage" className="dropdown-item source1" onClick={closeMobileMenu}>
                        Source 1
                    </NavLink>
                    <NavLink to="/PayBill/source2" className="dropdown-item source2" onClick={closeMobileMenu}>
                        Source 2
                    </NavLink>
                    <NavLink to="/PayBill/create-pin" className="dropdown-item create-pin" onClick={closeMobileMenu}>
                        Create Pin
                    </NavLink>
                </div>
            )}
        </li>
    );
};

export default PayBillDropDown;
