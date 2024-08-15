import { useEffect, useState } from "react";
import LoadingScreen from "../../../components/reuseableComponents/LoadingPage/LoadingScreen";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import ToggleSlider from "../../../components/reuseableComponents/Slider/ToggleSlider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  getReceiverDetails,
  makeTransferRequest,
} from "../../../services/transferService";
import { useLocalState } from "../../../utils/useLocalStorage";

const TransferInfo = () => {
  const [screenLoading, setScreenLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [amount, setAmount] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const [jwt] = useLocalState("", "jwt");

  const userJson = localStorage.getItem("user");
  const userData = JSON.parse(userJson);

  const navigate = useNavigate();

  const balance = parseFloat(userData.wallet.amount.ngn);
  console.log("balance", balance);

  useEffect(() => {
    // Set a timeout to switch off the loading screen after 3 seconds
    const timer = setTimeout(() => {
      setScreenLoading(false);
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // useEffect for making the send button valid
  useEffect(() => {
    // Check if all fields are filled to enable the send button
    if (email && receiver && amount) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, receiver, amount]);

  // Request to fetch the receivers details
  const handleEmailChange = async (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Regular expression to validate the email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(enteredEmail)) {
      // Make the API request to get the receiver's details
      const receiverData = await getReceiverDetails(
        { email: enteredEmail },
        jwt
      );
      if (receiverData) {
        setReceiver(receiverData);
      } else {
        setReceiver(null); // Clear the receiver field if no data is found
        toast.error("Receiver not found.");
      }
    }
  };

  const handleAmountChange = (e) => {
    const amountEntered = e.target.value;

    // Check if the input is a number or an empty string (to allow clearing the input)
    if (amountEntered === "" || !isNaN(amountEntered)) {
      setAmount(amountEntered);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading();

    // Validate the form fields before submission
    if (!email || !receiver || !amount) {
      toast.dismiss();
      toast.error("Please fill in all fields.");
      return;
    }

    if (parseFloat(amount) > balance) {
      toast.dismiss();
      toast.error("Insufficient balance.");
      return;
    }

    const transferData = {
      email,
      amount,
    };

    // Make the transfer request
    const isSuccess = await makeTransferRequest(transferData, jwt);

    // If the request was successful, navigate to the desired page
    if (isSuccess) {
      navigate("/transfer-payment");
    }
  };

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

      <div className="transfer-body">
        <div className="transfer-card-wrapper">
          <div className="transfer-card-content">
            <p className="transfer-account-name">Diamond account</p>
            <p className="center-text">Balance</p>
            <p className="center-text">
              {showBalance ? `NGN ${balance}` : "NGN XXXX.XX"}
            </p>
            <div className="slider-wrapper">
              <p>Hide Balance</p>
              <div className="slider-casing">
                <ToggleSlider onToggle={setShowBalance} />
              </div>
            </div>

            <div className="transfer-cash-back">
              <p>Cash Back</p>
              <button>
                <FaArrowRight className="cash-back-arrow" />
              </button>
            </div>
          </div>
        </div>

        <div className="transfer-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="transfer-receiver-email">
              <label htmlFor="receiver-email">Enter Receiver's email</label>
              <input
                type="email"
                name="receiver-email"
                id="receiver-email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="transfer-receiver">
              <label htmlFor="receiver">Enter Receiver</label>
              <input
                type="text"
                name="receiver"
                id="receiver"
                placeholder="@patrick"
                value={
                  receiver ? `${receiver.first_name} ${receiver.last_name}` : ""
                }
                readOnly
              />
            </div>

            <div className="transfer-receiver-amount">
              <label htmlFor="transfer-amount">Amount</label>
              <input
                type="text"
                name="transfer-amount"
                id="transfer-amount"
                placeholder="5000"
                onChange={handleAmountChange}
                value={amount}
              />
            </div>

            <div>
              <button className="transfer-send-btn" disabled={!isFormValid}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default TransferInfo;
