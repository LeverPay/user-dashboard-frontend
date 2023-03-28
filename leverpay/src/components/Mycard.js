import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import './CardCategories.css'
import CardUser from '../Cards/CardUserDefault'

function Mycard(props) {
    return (
        <Container className='px-4 py-5 text-center' id='mycards'>
            <Row className='justify-content-center'>
                <Col className='col-5'>
                    <CardUser />
                </Col>
                <Col className='col-1'>

                </Col>
                <Col className='col-5'>
                    {props.card}
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col className=''>
                    <div className='card-balance' style={{ backgroundColor: '#0E093F' }}>
                        <span>
                            <img alt='' src='./images/bal1.png' />
                        </span>
                        <main>
                            <small>
                                Total Balance
                            </small>
                            <h4>
                                $5420.31
                            </h4>
                        </main>
                    </div>
                </Col>
                <Col className=''>
                    <div className='card-balance' style={{ backgroundColor: '#F6A61F' }}>
                        <span>
                            <img alt='' src='./images/bal1.png' />
                        </span>
                        <main>
                            <small style={{ color: 'white' }}>
                                Total Balance
                            </small>
                            <h4>
                                $5420.31
                            </h4>
                        </main>
                    </div>
                </Col>
                <Col className=''>
                    <div className='card-balance' style={{ backgroundColor: '#0E093F' }}>
                        <span>
                            <img alt='' src='./images/bal1.png' />
                        </span>
                        <main>
                            <small>
                                Total Balance
                            </small>
                            <h4>
                                $5420.31
                            </h4>
                        </main>
                    </div>
                </Col>
            </Row>
            <Row className='Upgrade-con'>
                <Col className='px-6'>
                    <button className='upgrade-card-btn'>
                        <span>+</span>
                        Upgrade Card
                    </button>
                </Col>
            </Row>
        </Container>
    )
}

export default Mycard