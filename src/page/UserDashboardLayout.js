import React from "react";
import NavComponent from "../components/NavComponent/NavComponent";
import TopNav from "../components/TopNav/TopNav";
import StatementComponent from "../components/StatementComponent/StatementComponent";
import { useEffect, useState } from "react";
import { naijaCardDetails, silverCardDetails } from "../TestData/CardData";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import CardcategoryPage from "./CardCategoryPage/CardcategoryPage";
import MyCardsSilver from "./SilverCardPage/MyCardsSilver";
import MyUpgradedAccount from "../components/MyUpgradedAccount/MyUpgradedAccount";
import TotalMoney from "../components/TotalMoney/TotalMoney";
import CardUser from "../components/AllCards/CardUserDefault";
import { MerchantComponent } from "../components/MerchantComponent/MerchantComponent";
import "./UserDashboardLayout.css";
import Settings from "./SettingsPage/Settings";
import ProfilePage from "../page/ProfilePage/ProfilePage";
import HelpForm from "./HelpForm/HelpForm";
import Faq from "./FaqPage/Faq";
import Feedback from "./Feedback/Feedback";
import PaymentPage from "./PaymentPage/PaymentPage";
import ResetPassword from "../components/ResetPasswordComponent/ResetPassword";
import SignInPage from "./SignInPage/SignInPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { useLocalState } from "../utils/useLocalStorage";
import { getUserProfile } from "../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import TransferPage from "./TransferPage/TransferPage";
import SignupPage from "./SignupPage/SignupPage";
import FundingPage from "./FundingPage/FundingPage";
import FundingPayment from "../components/AccountFunding/FundingPayment";
import FundingNaira from "../components/AccountFunding/FundingNaira";
import FundingPaystack from "../components/AccountFunding/FundingPaystack";
import FundingMore from "../components/AccountFunding/FundingMore";
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
import AllTransactions from "./AllTransactions/AllTransactions";
import AllTransactionCon from "./AllTransactions/AllTransactionCon";
import AllFundingHistoryCon from "./AllTransactions/AllFundingHistoryCon";

export const UserDashboardLayout = (props) => {
  const [naijaCard, setNaijaCard] = useState({});
  const [silverCard, setSilverCard] = useState([]);
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useLocalState("", "jwt");
  const userJson = localStorage.getItem("user");
  const userData = JSON.parse(userJson);
  console.log(userData);
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
        <Route path="/investment" element={<Investment/>} />
        <Route
          element={
            <>
              <div className="col-md-12 flexy" style={{ overflowX: "hidden" }}>
                <div className="nav-con">
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
                <div className="dashboard-right col-md-8">
                  <div
                    className="spending col-md-12 flexy"
                    style={{ marginTop: "-1rem" }}
                  >
                    <div className="col-md-4">
                      <TotalMoney
                        bg="#0E093F"
                        totaltype="Total Balance"
                        amt={userData ? userData.wallet.amount.ngn : ""}
                      />
                    </div>
                    <div className="col-md-4">
                      <TotalMoney
                        bg="#F6A61F"
                        totaltype="Total Spending"
                        amt={userData ? userData.total_spending.ngn : ""}
                      />
                    </div>
                    <div className="col-md-4">
                      <TotalMoney
                        bg="#201E34"
                        totaltype=" Total Saved"
                        // amt={userData ? userData.total_save.ngn : ""}
                      />
                    </div>
                  </div>
                  <div className="statement col-md-11">
                    <StatementComponent />
                  </div>
                  <div className="dashboard-transaction-table-container col-md-11">
                    <AllTransactions />
                  </div>
                </div>
                <div className="dashboard-left col-md-4  card-holder">
                  <div className="col-md-12 default-card-holder">
                    <header className="card-header">My Card</header>
                    <CardUser />
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
                    <div className="mchnt-con-div">
                    <MerchantComponent />
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <Route path="transactions" element={<AllTransactionCon />} />
          <Route path="funding-history" element={<AllFundingHistoryCon />} />
          <Route exact path="transfer" element={<TransferPage />} />
          <Route exact path="/investment" element={<Investment />} />

          <Route path="invoices" element={<AllInvoicePage />}>
            <Route index element={<Allinvoices />} />
            <Route path="all-invoices" element={<Allinvoices />} />
            <Route path="unpaid-invoices" element={<UnpaidInvoicePage />} />
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
                  otherName: user.other_name,
                  gender: user.gender,
                  reg_email: user.email,
                  reg_phone: user.phone,
                }}
              />
            }
          />
          <Route path="help" element={<HelpForm />} />
          <Route path="faq" element={<Faq />} />
          <Route path="customer-support" element={<Feedback />} />
          <Route path="payment-page" element={<PaymentPage />}>
            <Route index element={<CreditCard />} />
            <Route path="credit-card" element={<CreditCard />} />
            <Route
              path="checkout-transfer"
              element={<CheckoutTransfer isInvest={true} />}
            />
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
