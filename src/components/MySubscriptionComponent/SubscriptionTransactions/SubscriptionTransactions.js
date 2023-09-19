import React from "react";
import "./SubscriptionTransaction.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SubscriptionTableComponent from "../../SubscriptionTableComponent/SubscriptionTableComponent";
import {
  CompletedSubscriptionData,
  PendingSubscriptionData,
} from "../../../TestData/SubscriptionData";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SubscriptionTransactions = () => {
  // const location = useLocation();
  // const { payNow } = location.state;

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
            <SubscriptionTableComponent data={CompletedSubscriptionData} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="subscription-row">
            <p className="table-user"> Hi! Terna Nanev</p>
            <SubscriptionTableComponent data={PendingSubscriptionData} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SubscriptionTransactions;
