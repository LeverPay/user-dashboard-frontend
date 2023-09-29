import React from "react";
import NavComponent from "../components/NavComponent/NavComponent";
import TopNav from "../components/TopNav/TopNav";
import StatementComponent from "../components/StatementComponent/StatementComponent";
import TransactionTable from "./Transactions/TransactionTable/TransactionTable";
import { recentTransactions } from "../TestData/TransactionsData.js";
import { useEffect, useState } from "react";
import { naijaCardDetails, silverCardDetails } from "../TestData/CardData";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Transactions } from "./Transactions/Transactions";
import TransactionInvoices from "./Transactions/TransactionTable/TransactionInvoices";
import InvoicePage from "./InvoicePage/InvoicePage";
// import Mycard from "./MyCardPage.js/Mycard";
// import Mycard from "./MyCardPage/Mycard";
import CardcategoryPage from "./CardCategoryPage/CardcategoryPage";
// import MyCardDiamond from "../page/DiamondCardPage/MyCardDiamond";
import MyCardsSilver from "./SilverCardPage/MyCardsSilver";
// import MyCardGold from "../page/GoldCardPage/MyCardGold";
// import { ReturnMessage } from "./KYCForms/KYCFormsUpgradeMessages/ReturnMessage";
import MyUpgradedAccount from "../components/MyUpgradedAccount/MyUpgradedAccount";
import TotalMoney from "../components/TotalMoney/TotalMoney";
import CardUser from "../components/AllCards/CardUserDefault";
import CardSilver from "../components/AllCards/CardSilver";
import { MerchantComponent } from "../components/MerchantComponent/MerchantComponent";
import "./UserDashboardLayout.css";
import Settings from "./SettingsPage/Settings";
import ProfilePage from "../page/ProfilePage/ProfilePage";
import HelpForm from "./HelpForm/HelpForm";
import Faq from "./FaqPage/Faq";
import Feedback from "./Feedback/Feedback";
import PaymentPage from "./PaymentPage/PaymentPage";
import UnpaidInvoice from "./UnpaidInvoicePage/UnpaidInvoicePage";
import ResetPassword from "../components/ResetPasswordComponent/ResetPassword";
import SignInPage from "./SignInPage/SignInPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { useLocalState } from "../utils/useLocalStorage";
import { getUserProfile } from "../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import TransferPage from "./TransferPage/TransferPage";
import axios from "axios";
import SignupPage from "./SignupPage/SignupPage";
import FundingPage from "./FundingPage/FundingPage";
import FundingPayment from "../components/AccountFunding/FundingPayment";
import FundingInitiating from "../components/AccountFunding/FundingInitiating";
import FundingNaira from "../components/AccountFunding/FundingNaira";
import FundingPaystack from "../components/AccountFunding/FundingPaystack";
import FundingMore from "../components/AccountFunding/FundingMore";
import FundingpaymentForm from "../components/AccountFunding/FundingpaymentForm";
import UnpaidReceipt from "../components/UnpaidInvoice/UnpaidReceipt";
import SignupOTP from "../components/SignupComponent/SignupOTP/SignupOTP";
import Investment from "./InvestmentPage/Investment";
import MySubscription from "./MySubscriptionPage/MySubscription";
import SubscriptionTransactions from "../components/MySubscriptionComponent/SubscriptionTransactions/SubscriptionTransactions";
import { CreditCard } from "./PaymentPage/CreditCard/CreditCard";
import CheckoutTransfer from "../components/CheckoutTransfer/CheckoutTransfer";
import AllInvoicePage from "./AllInvoicePage/AllInvoicePage";
import Allinvoices from "./AllInvoices/Allinvoices";
import UnpaidInvoicePage from "./UnpaidInvoicePage/UnpaidInvoicePage";
import PaidInvoice from "./InvoicePage/Invoice/PaidInvoice";



export const UserDashboardLayout = (props) => {
  const [naijaCard, setNaijaCard] = useState({});
  const [silverCard, setSilverCard] = useState([]);
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useLocalState("", "jwt");

  console.log(user);

  useEffect(() => {
    setNaijaCard({
      id: naijaCardDetails.map((data) => data.id),
      cardHolder: naijaCardDetails.map((data) => data.cardHolder),
      cardNo: naijaCardDetails.map((data) => data.cardNo),
      expiryDate: naijaCardDetails.map((data) => data.expiryDate),
    });
  }, []);

  useEffect(() => {
    setSilverCard({
      id: silverCardDetails.map((data) => data.id),
      cardHolder: silverCardDetails.map((data) => data.cardHolder),
      cardNo: silverCardDetails.map((data) => data.cardNo),
      expiryDate: silverCardDetails.map((data) => data.expiryDate),
    });
  }, []);

  useEffect(() => {
    getUserProfile(jwt, setJwt, setUser);
  }, [jwt, setJwt]);

  // useEffect(() => {
  //   axios
  //     .get("https://leverpay-api.azurewebsites.net/api/v1/user/get-card", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${jwt}`,
  //       },
  //       // configuration
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       // do something with JSON response data
  //     });
  // });
  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <div className="col-md-12 flexy" style={{ overflowX: "hidden" }}>
                <div className="nav-con" >
                  <NavComponent />
                </div>
                <div className="col-md-10">
                  <TopNav
                    userName={{
                      firstName: user.first_name,
                      lastName: user.last_name,
                      passport: user.passport,
                    }}
                  />
                  <PrivateRoute userName={user.first_name}>
                    <Outlet />
                  </PrivateRoute>
                </div>
              </div>
            </>
          }
        >
          <Route
            path="/"
            element={
              <div className="dashboard col-md-12 flexy">
                <div className="col-md-8">
                  <div
                    className="spending col-md-12 flexy"
                    style={{ marginTop: "-1rem" }}
                  >
                    <div className="col-md-4">
                      <TotalMoney
                        bg="#0E093F"
                        totaltype="Total Balance"
                        amt="3000"
                      />
                    </div>
                    <div className="col-md-4">
                      <TotalMoney
                        bg="#F6A61F"
                        totaltype="Total Spending"
                        amt="2000"
                      />
                    </div>
                    <div className="col-md-4">
                      <TotalMoney
                        bg="#201E34"
                        totaltype=" Total Saved"
                        amt="546"
                      />
                    </div>
                  </div>
                  <div className="statement col-md-11">
                    <StatementComponent />
                  </div>
                  <div className="dashboard-transaction-table-container col-md-11">
                    <TransactionTable
                      data={recentTransactions}
                      tableTitle="Recent Transaction"
                    />
                  </div>
                </div>
                <div className="col-md-4  card-holder">
                  <div className="col-md-10 mx-auto default-card-holder">
                    <header className="card-header">My Card</header>
                    <CardUser
                      firstName={user.first_name}
                      lastName={user.last_name}
                    />
                  </div>
                  {/* <div
                    className="col-md-10 mx-auto"
                    style={{ transform: "translateY(-3.5rem)" }}
                  >
                    <CardSilver
                      firstName={user.first_name}
                      lastName={user.last_name}
                    />
                  </div> */}
                  <div className="mchnt-con col-md-12">
                    <MerchantComponent />
                  </div>
                </div>
              </div>
            }
          />

          <Route path="transactions" element={<Transactions />} />
          <Route
            path="transactions-invoices"
            element={<TransactionInvoices />}
          />
          <Route exact path="transfer" element={<TransferPage />} />
          <Route exact path="/investment" element={<Investment/>} />

          <Route path="invoices" element={<AllInvoicePage />}>
          <Route index element={<Allinvoices/>} />
          <Route path="all-invoices" element={<Allinvoices/>} />
          <Route path="unpaid-invoices" element={<UnpaidInvoicePage/>} />
          <Route path="paid-invoice" element={<PaidInvoice />} />
          </Route>
          
          <Route path="/unpaid-invoice" element={<UnpaidReceipt />} />
          
          <Route path="/pending-subscription" element />

          <Route path="funding" element={<FundingPage />}>
            <Route index element={<FundingPayment />} />
            <Route path="stablecoins-deposit" element={<FundingPayment />} />
            <Route path="naira-deposit" element={<FundingNaira />} />
            <Route path="paystack-deposit" element={<FundingPaystack />} />
            <Route path="more" element={<FundingMore />} />
          </Route>
          <Route path="cardCategories" element={<CardcategoryPage />} />
          <Route path="account" element={<MyUpgradedAccount />} />
          <Route
            path="my cards"
            element={
              <MyCardsSilver
                firstName={user.first_name}
                lastName={user.last_name}
              />
            }
          />
          <Route path="settings" element={<Settings />} />
          <Route
            path="profile"
            element={
              <ProfilePage
                userName={{
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  phoneNumber: user.phone,
                  gender: user.gender,
                }}
              />
            }
          />
          <Route path="help" element={<HelpForm />} />
          <Route path="block-my-card" element={<HelpForm />} />
          <Route path="faq" element={<Faq />} />
          <Route path="customer-support" element={<Feedback />} />
          <Route path="payment-page" element={<PaymentPage />} >
            <Route index element={<CreditCard />} />
              <Route path="credit-card" element={<CreditCard/>} />
              <Route path="checkout-transfer" element={<CheckoutTransfer isInvest={true} />} />
          </Route>
          <Route path="/my-subscriptions" element={<MySubscription />} />
          <Route
            path="my-subscriptions/subscription-transactions"
            element={<SubscriptionTransactions />}
          />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Route>
        <Route exact path="reset-password" element={<ResetPassword />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="leverpay-signup" element={<SignupPage />} />
        <Route path="leverpay-signup/signup-OTP" element={<SignupOTP />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default UserDashboardLayout;
