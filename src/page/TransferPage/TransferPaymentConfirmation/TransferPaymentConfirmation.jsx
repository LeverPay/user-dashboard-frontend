import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import LoadingScreen from "../../../components/reuseableComponents/LoadingPage/LoadingScreen";
import Confirmation from "../../../components/TransferPageComponent/Confirmation/Confirmation";
import { useLocation } from "react-router-dom";

import "./TransferPaymentConfirmation.css";

const TransferPaymentConfirmation = () => {
  const [screenLoading, setScreenLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;

  const success = state?.success ?? false;

  useEffect(() => {
    // Set a timeout to switch off the loading screen after 3 seconds
    const timer = setTimeout(() => {
      setScreenLoading(false);
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (screenLoading) {
    return (
      <div className="transfer-loading-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <section id="transfer-interface">
      <div className="transfer-header">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
        <h1>Transfer</h1>
        <div className="not-needed"></div>
      </div>

      <div className="confirmation-body">
        <Confirmation success={success} />
      </div>
    </section>
  );
};

export default TransferPaymentConfirmation;
