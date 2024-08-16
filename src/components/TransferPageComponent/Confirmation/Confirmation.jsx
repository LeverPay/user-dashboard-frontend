import { Link } from "react-router-dom";
import "./Confirmation.css";

import logo_white from "../../../assets/images/halfLogo_white.png";
import confirm_success from "../../../assets/images/confirm_success.png";
import confirm_failed from "../../../assets/images/confirm_failed.png";
import { useEffect, useState } from "react";

const Confirmation = ({ success }) => {
  const [confirmData, setConfirmData] = useState({});

  useEffect(() => {
    if (success) {
      setConfirmData({
        image: confirm_success,
        status: "Transfer Successfull",
        message: "Thank you for choosing Leverpay!",
        class: "confirm_transaction_status_blue",
        route: "/transfer",
        link_text: "Done",
      });
    } else {
      setConfirmData({
        image: confirm_failed,
        status: "Transfer Failed",
        message: "Try Again",
        class: "confirm_transaction_status_red",
        route: "/transfer-info",
        link_text: "Try again",
      });
    }
  }, []);

  return (
    <div className="confirm_content_wrapper">
      <div className="confirm_logo_wrapper">
        <img src={logo_white} alt="leverpay white half logo" />
      </div>

      <div className="confirm_alert_wrapper">
        <div className="customized_line"></div>

        <div className="confirm_main_message">
          <img src={confirmData.image} alt="confirmation dia" />
          <p className={`confirm_transaction_status ${confirmData.class}`}>
            {confirmData.status || ""}
          </p>
          <p className="confirm_transaction_extra_msg">
            {confirmData.message || ""}
          </p>
        </div>

        <div className="confirm_redirect_wrapper">
          <Link to={confirmData.route} className="confirm_redirect_btn">
            {confirmData.link_text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
