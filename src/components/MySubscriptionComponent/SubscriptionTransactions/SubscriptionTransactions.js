import React from "react";
import "./SubscriptionTransaction.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SubscriptionTableComponent from "../../SubscriptionTableComponent/SubscriptionTableComponent";

const SubscriptionTransactions = () => {
  return (
    <div className="st-container">
      <Tabs>
        <TabList>
          <Tab>Active Subscriptions</Tab>
          <Tab>Pending Subscriptions</Tab>
        </TabList>

        <TabPanel>
          <div className="subscription-row">
            <p className="table-user"> Hi! Terna Nanev</p>
            <SubscriptionTableComponent />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SubscriptionTransactions;
