import React from 'react'
import CardDefault from '../components/CardDefault'
import CardInfo from '../components/CardInfo'
function CardEnterprise() {
  return (
      <CardDefault backgroundImage = './images/CardEnterprise.png' cardtype = 'USDT' cardname='Enterprise' name={CardInfo[2].name}  lock = './images/lock.png' bg2= "url('./images/Ellipse 7.png')" cardNumber = {CardInfo[1].no} />
  )
}

export default CardEnterprise