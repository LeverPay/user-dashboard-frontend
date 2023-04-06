import React from "react";
import NavComponent from "../components/NavComponent/NavComponent";
import TopNav from "../components/TopNav/TopNav";
import StatementComponent from "../components/StatementComponent/StatementComponent";
import TransactionTable from "./Transactions/TransactionTable/TransactionTable";
import { recentTransactions } from "../TestData/TransactionsData.js";
import { useEffect, useState } from "react";
import { naijaCardDetails, silverCardDetails } from "../TestData/CardData";
import { Routes, Route } from "react-router-dom";
import { Transactions } from "./Transactions/Transactions";
import InvoicePage from "./InvoicePage/InvoicePage";
// import Mycard from "./MyCardPage.js/Mycard";
import Mycard from "./MyCardPage/Mycard";
import CardcategoryPage from "./CardCategoryPage/CardcategoryPage";
// import MyCardDiamond from "../page/DiamondCardPage/MyCardDiamond";
import MyCardsSilver from "./SilverCardPage/MyCardsSilver";
import MyCardGold from "../page/GoldCardPage/MyCardGold";
import { ReturnMessage } from "./KYCForms/KYCFormsUpgradeMessages/ReturnMessage";
import MyUpgradedAccount from "../components/MyUpgradedAccount/MyUpgradedAccount";
import TotalMoney from "../components/TotalMoney/TotalMoney";
import CardUser from "../components/AllCards/CardUserDefault";
import CardSilver from "../components/AllCards/CardSilver";
import { MerchantComponent } from "../components/MerchantComponent/MerchantComponent";
import "./UserDashboardLayout.css";
import Settings from "./SettingsPage/Settings";
import ProfilePage from "./ProfilePage/ProfilePage";
export const UserDashboardLayout = () => {
  const [naijaCard, setNaijaCard] = useState({});
  const [silverCard, setSilverCard] = useState({});
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
  return (
    <>
      <div className="col-md-12 flexy" style={{ overflowX: "hidden" }}>
        <div className="col-md-2">
          <NavComponent />
        </div>
        <div className="col-md-10">
          <TopNav />

          <Routes>
            <Route
              path="/"
              element={
                <div
                  className="col-md-12 flexy"
                  style={{ marginTop: "8.5rem" }}
                >
                  <div className="col-md-8">
                    <div
                      className="col-md-12 flexy"
                      style={{ marginTop: "-1rem" }}
                    >
                      <div className="col-md-4">
                        {" "}
                        <TotalMoney
                          bg="#0E093F"
                          totaltype="Balance"
                          amt="$3000"
                        />
                      </div>{" "}
                      <div className="col-md-4">
                        {" "}
                        <TotalMoney
                          bg="#F6A61F"
                          totaltype="Spending"
                          amt="$2000"
                        />
                      </div>{" "}
                      <div className="col-md-4">
                        {" "}
                        <TotalMoney bg="#201E34" totaltype="Saved" amt="$546" />
                      </div>
                    </div>
                    <div className="col-md-11">
                      {" "}
                      <StatementComponent />
                    </div>
                    <div className="transaction-table-container col-md-11">
                      <TransactionTable
                        data={recentTransactions}
                        tableTitle="Recent Transaction"
                      />
                    </div>
                  </div>
                  <div className="col-md-4  card-holder">
                    <div className="col-md-10 mx-auto default-card-holder">
                      <header className="card-header">My Card</header>
                      <CardUser />
                    </div>{" "}
                    <div
                      className="col-md-10 mx-auto"
                      style={{ transform: "translateY(-3.5rem)" }}
                    >
                      <CardSilver />
                    </div>
                    <div className="col-md-12">
                      <MerchantComponent />
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="transactions" element={<Transactions />} />
            <Route path="invoices" element={<InvoicePage />} />
            <Route path="cardCategories" element={<CardcategoryPage />} />
            <Route path="account" element={<MyUpgradedAccount />} />
            <Route path="my cards" element={<MyCardsSilver />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<ProfilePage />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserDashboardLayout;
