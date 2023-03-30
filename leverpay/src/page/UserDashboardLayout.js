import React from "react";
import NavComponent from "../components/NavComponent";
import CardsComponent from "../components/CardsComponent";
import TopNav from "../components/TopNav";
import StatementComponent from "../components/StatementComponent";
import TransactionTable from "./Transactions/TransactionTable/TransactionTable";
import { recentTransactions } from "../TestData/TransactionsData.js";
import { useEffect, useState } from "react";
import { naijaCardDetails, silverCardDetails } from "../CardData";
import { Routes, Route } from "react-router-dom";
import { Transactions } from "./Transactions/Transactions";
import InvoicePage from "../Pages/InvoicePage";
import Mycard from "../components/Mycard";
import CardcategoryPage from "../Pages/CardcategoryPage";
import MyCardDiamond from "../Pages/MyCardDiamond";

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
                      {" "}
                      <CardsComponent
                        naijaCardData={naijaCard}
                        silverCardData={silverCard}
                      />
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
