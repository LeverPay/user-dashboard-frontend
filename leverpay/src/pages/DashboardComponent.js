import RecentTransactionComponent from "../components/RecentTransactionComponent";
import StatementComponent from "../components/StatementComponent";
import TopNav from "../components/TopNav";
import ShopDetailsComponent from "../components/ShopDetailsComponent";
import CardsComponent from "../components/CardsComponent";

import { naijaCardDetails, silverCardDetails } from "../CardData";
import { useEffect, useState } from "react";

const DashboardComponent = () => {
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
      <TopNav />
      <StatementComponent />
      <RecentTransactionComponent />
      <CardsComponent naijaCardData={naijaCard} silverCardData={silverCard} />
      <ShopDetailsComponent />
    </>
  );
};

export default DashboardComponent;
