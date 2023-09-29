import React from "react";
import TransferPageComponent from "../../components/TransferPageComponent/TransferPageComponent";

const TransferPage = ({ naira_code, dollar_code }) => {
  return (
    <>
      <TransferPageComponent
        naira_code={naira_code}
        dollar_code={dollar_code}
      />
    </>
  );
};

export default TransferPage;
