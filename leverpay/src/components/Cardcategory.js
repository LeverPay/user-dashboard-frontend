import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import './CardCategories.css'
import CardDiamond from '../Cards/CardDiamond'
import CardEnterprise from '../Cards/CardEnterprise'
import CardGold from '../Cards/CardGold'
import CardpinkLady from '../Cards/CardPinkLady'

function Cardcategory() {
    return (
        <Container className='px-5 py-5 col-md-8 col-sm-9' id='cardcategories' >
            <Row>
                <Row>
                    <Col className='col-5'>
                        <CardGold/>
                    </Col>
                    <Col className='col-2'>
                        <img alt='' className='img-responsive' src='./images/Line 25.png' />
                    </Col>
                    <Col className='col-5'>
                        <CardDiamond/>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col className='align-items-center mx-3 '>
                        <p className='Kyc-upgrade-notice' id='Kyc-upgrade-notice-1'>
                            To upgrade to the <span className='gold'>GOLD</span> Card, please complete the following verification<strong> (KYC)</strong>  Process as it is required by Government.  Click on the Card to start Verification. Note : <span className='limit'>Daily Spending  Limit is 1000 USDT</span>
                        </p>
                    </Col>
                    <Col className='col-2 '>
                    </Col>
                    <Col className='align-items-center '>
                        <p className='Kyc-upgrade-notice'>
                            To upgrade to the <span className='gold'>GOLD</span> Card, please complete the following verification<strong> (KYC)</strong>  Process as it is required by Government.  Click on the Card to start Verification. Note : <span className='limit'>Daily Spending  Limit is 1000 USDT</span>
                        </p>
                    </Col>
                </Row>
            </Row>
            <Row className='mt-3'>
                <Row>
                    <Col className='col-5'>
                        <CardpinkLady/>
                    </Col>
                    <Col className='col-2'>
                        <img alt='' className='img-responsive' src='./images/Line 25.png' />
                    </Col>
                    <Col className='col-5'>
                        <CardEnterprise/>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col className='align-items-center mx-3'>
                        <p className='Kyc-upgrade-notice' id='Kyc-upgrade-notice-1'>
                            To upgrade to the <span className='gold'>GOLD</span> Card, please complete the following verification<strong> ( KYC )</strong>  Process as it is required by Government.  Click on the Card to start Verification. Note : <span className='limit'>Daily Spending  Limit is 1000 USDT</span>
                        </p>
                    </Col>
                    <Col className='col-2 '>
                    </Col>
                    <Col className='align-items-center '>
                        <p className='Kyc-upgrade-notice'>
                            To upgrade to the <span className='gold'>GOLD</span> Card, please complete the following verification<strong> ( KYC )</strong>  Process as it is required by Government.  Click on the Card to start Verification. Note : <span className='limit'>Daily Spending  Limit is 1000 USDT</span>
                        </p>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default Cardcategory