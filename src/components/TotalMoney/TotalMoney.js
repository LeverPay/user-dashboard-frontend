import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocalState } from "../../utils/useLocalStorage";
import "./totalMoney.css";

function TotalMoney(props) {
  const { bg, transfer, totaltype, amt, exAmt, naira_code, dollar_code } =
    props;
  const [amtVisible, setAmtVisible] = useState(false);
  const [rate, setRate] = useState()
  const [jwt, setJwt] = useLocalState('', 'jwt')

  useEffect(()=>{
    axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-exchange-rates',  {
      headers: {
          Authorization : `Bearer ${jwt}`
      }
  })
    .then(res=>{
      setRate(res.data.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  const dollar = rate ? '$' + (amt/rate.rate).toFixed(2) : ''

  // console.log(amt);

  function viewamt() {
    setAmtVisible(!amtVisible);
  }

  return (
    <div
      className="card-balance col-md-12"
      style={{ backgroundColor: bg }}
      onClick={viewamt}
    >
      <span className="bal-img-con">
        <img alt="" src="./images/bal1.png" />
      </span>
      <main>
        <p>{totaltype}</p>
        <strong> {amtVisible ? `N${amt}` : "XXXX"} </strong>
        <small>{amtVisible ? dollar : 'xxx'}</small> 
      </main>
    </div>
  );
}

export default TotalMoney;
