import React,{ useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import './invoice.css'
import { nanoid } from 'nanoid'
import QRCode from 'qrcode'



function Invoice() {

    const [id] = useState(nanoid)

    const [qrcode, setQrcode] = useState(id)

   useEffect(()=>{
       QRCode.toDataURL(id, {
        margin : 1,
        width: 70,
        color: {
            dark: '#1C1A2E',
            light: '#F49B09'
        }
       }, (err, id)=>{
        err ? console.log('err'): setQrcode(id)
       }) 
   })


    const date = new Date()
    const Morning_Afternoon = date.getHours() > 12 ? 'pm' : 'am'
    const minutes = date.getMinutes() < 1 ? `0${date.getMinutes()}`: `${date.getMinutes()}`
    const timeofDay = date.getHours() +':' + minutes+' ' +Morning_Afternoon
    const time = date.toDateString()+ ' ' + timeofDay

    return (
        <Container className='pt-3 px-3 py-4 col-md-4 col-12' id='invoice'>
            <h4 className='text-center'>{id}</h4>
            <div className='price_checkout'>
                <span className='px-md-3'>
                    <h5>$420.89</h5>
                    <h5>Total USD</h5>
                </span>
                <span className='px-md-3'>
                    <h5>0.45656</h5>
                    <h5>Total ETH</h5>
                </span>
                <span className='px-md-3'>
                    <h5 style={{color: '#0EB500'}} >$420.89</h5>
                    <h5 style={{color: '#F49B09'}}>Paid(ETH)</h5>
                </span>
            </div>
            <div className='Invoice_details'>
                <h3>
                    INVOICE DETAILS
                </h3>
                <Container fluid>
                    <Row>
                        <Col className='h5'>
                            Order ID
                        </Col>
                        <Col className='h5'>
                            Order1
                        </Col>
                    </Row>
                    <Row>
                        <Col className='row_details'>
                            Status
                        </Col>
                        <Col className='row_details_information' style={{color: '#0EB500'}}>
                            Successful
                        </Col>
                    </Row>
                    <Row>
                        <Col className='row_details'>
                            Confirmations
                        </Col>
                        <Col className='row_details_information'>
                            40
                        </Col>
                    </Row>
                    <Row>
                        <Col className='row_details'>
                            Currency
                        </Col>
                        <Col className='row_details_information' style={{color: '#F49B09'}}>
                            ETH
                        </Col>
                    </Row>
                    <Row>
                        <Col className='row_details'>
                            Created at
                        </Col>
                        <Col className='row_details_information' style={{fontSize: '12px'}}>
                           {time}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='row_details'>
                            Items
                        </Col>
                        <Col className='row_details_information'>
                            Iphone 13 pro max
                        </Col>
                    </Row>
                </Container>
            </div>
            <hr/>
            <div className='Buyer_details'>
                <h3>
                    Buyer Information
                </h3>
                <h5>
                    Email
                </h5>
                <p>
                Jamiltextile001@gmail.com
                </p>
            </div>
            <hr/>
            <div className='Payment_received'>
                <p>Payment Recieved  for <span>4.0245800ETH</span> </p>
                <p>TXID: <span>( {id.slice(0,8)} )</span></p>
                <p>{time}</p>
                <main>
                    <div>
                    <p>Company</p>
                    <h6>Apple inc</h6>
                    </div>
                    <div>
                      { qrcode && <img alt='' className='qrcodeCon' src={qrcode}/>}
                    </div>
                </main>
            </div>
            <hr/>
        </Container>
    )
}

export default Invoice