import React from "react";

const SubscriptionTableComponent = () => {
  return (
    <div>
      <table class="table table-striped subscription-table">
        <h4 className="subscription-history-text">Subscription History</h4>
        &nbsp;
        <tr>
          <th className="name-head">NAME/BUSINESS</th>
          <th>DATE</th>
          <th>TYPE</th>
          <th>AMOUNT</th>
          <th>STATUS</th>
        </tr>
        <tr>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

export default SubscriptionTableComponent;
