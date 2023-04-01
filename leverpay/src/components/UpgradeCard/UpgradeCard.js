import React from 'react'
import Col from "react-bootstrap/esm/Col";
import './upgradeCard.css'

function UpgradeCard() {
  return (
    <Col className="px-6">
    <button className="upgrade-card-btn">
      <span>+</span>
      Upgrade Card
    </button>
  </Col>
  )
}

export default UpgradeCard