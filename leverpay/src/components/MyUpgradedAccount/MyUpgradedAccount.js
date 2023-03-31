import React, { useEffect, useState } from "react";
import MyCardDiamond from "../../page/DiamondCardPage/MyCardDiamond";
import MyCardGold from "../../page/GoldCardPage/MyCardGold";
import MyCardPinkLady from "../../page/PinkLadyCardPage/MyCardPinkLady";
import MycardEnterprise from "../../page/EnterpriseCardPage/MycardEnteprise.js";

function MyUpgradedAccount() {
  const [account, setAccount] = useState(false);
  const [accountType, setAccountType] = useState(false);

  const accSet = () => {
    setAccountType(localStorage.getItem("accountType"));
    // alert(accountType);
  };
  useEffect(() => {
    accSet();
  });
  useEffect(() => {
    switch (accountType) {
      case "gold":
      default:
        setAccount(MyCardGold);
        break;
      case "diamond":
        setAccount(MyCardDiamond);
        break;
      case "pinkLady":
        setAccount(MyCardPinkLady);
        break;
      case "enterprise":
        setAccount(MycardEnterprise);
        break;
    }
  }, [accountType]);
  return <>{account}</>;
}

export default MyUpgradedAccount;
