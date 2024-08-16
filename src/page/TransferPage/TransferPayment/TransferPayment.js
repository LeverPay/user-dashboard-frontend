import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import LoadingScreen from "../../../components/reuseableComponents/LoadingPage/LoadingScreen";
import TransferPaymentComp from "../../../components/TransferPageComponent/TransferPaymentComp";

const TransferPayment = () => {
  const [screenLoading, setScreenLoading] = useState(true);

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
        <button>
          <IoIosArrowBack />
        </button>
        <h1>Transfer</h1>
        <div className="not-needed"></div>
      </div>

      <div className="transfer-body">
        <div>
          <TransferPaymentComp />
        </div>
      </div>
    </section>
  );
};

export default TransferPayment;
