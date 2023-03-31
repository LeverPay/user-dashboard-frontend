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
// import InvoicePage from "../../Page/InvoicePage";
import Mycard from "./MyCardPage.js/Mycard";
import CardcategoryPage from "./CardCategoryPage/CardcategoryPage";
import MyCardDiamond from "../page/DiamondCardPage/MyCardDiamond";

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
      <div className="col-md-12 flexy">
        <div className="col-md-2">
          <NavComponent />
        </div>
        <div className="col-md-10">
          <TopNav />

          <Routes>
            <Route
              path="/"
              element={
                <div className="col-md-12 flexy">
                  <div className="col-md-8">
                    <StatementComponent />
                    <TransactionTable
                      data={recentTransactions}
                      tableTitle="Recent Transaction"
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="col-md-10">
                      {/* {" "}
                      <CardsComponent
                        naijaCardData={naijaCard}
                        silverCardData={silverCard}
                      /> */}
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="transactions" element={<Transactions />} />
            {/* <Route path="invoices" element={<InvoicePage />} /> */}
            <Route path="invoices" element={<MyCardDiamond />} />
            <Route path="my cards" element={<CardcategoryPage />} />
            {/* <Route path="settings" element />
        <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserDashboardLayout;
