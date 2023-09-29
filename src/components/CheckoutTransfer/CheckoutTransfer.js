import React from 'react'
import './CheckoutTransfer.css'
import { useState, useEffect } from 'react'
import Helpimageupload from '../HelpImageUpload/helpimageupload'
import Investment from '../../page/InvestmentPage/Investment'
import axios from 'axios'
import { useLocalState } from '../../utils/useLocalStorage'


const CheckoutTransfer = ({ amount, checkoutData, vat, txfee, prevStep, nextStep, isInvest }) => {
    const totalAmt = (amount * 1) + (vat * 1) + (txfee * 1)
    const [fileImg, setFileimg] = useState()
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [copyAlert, setCopyAlert] = useState('')
    const [ncopyAlert, setNCopyAlert] = useState('')
    const [isAcct, setIsAcct] = useState(false)
    const [account_Info, setAccount_Info] = useState([])
    const [account_no, setAccount_no] = useState()
    const [account_name, setAccount_name] = useState()
    const [imgfile, setImgfile] = useState()
    function GetImg(value) {
        setFileimg(value)
    }


    useEffect(() => {
        axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-account-numbers', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(res => {
                console.log(res.data)
                setAccount_Info(res.data.data)
                if (res.data.data.length > 0) {
                    setIsAcct(true)
                } else setIsAcct(false)
            })
            .catch(err => {
                console.log(err)
                setIsAcct(false)
            })
    }, [])

    // const account_Info = [
    //     { name: 'GT Bank', number: '0054789923' },
    //     { name: 'First Bank', number: '3120789923' },
    //     { name: 'Kuda Bank', number: '2054569929' },
    //     { name: 'Providus Bank', number: '9105479905' }
    // ]


    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        txid: '',
        narration: '',
        Bank_name: isAcct ? account_Info[0].name : '',
        fileImg: fileImg,
        imginfo: imgfile,

    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (isAcct) {
            if (formData.Bank_name === account_Info[0].bank) {
                setAccount_name(account_Info[0].account_name)
                setAccount_no(account_Info[0].account_number)
            } else if (formData.Bank_name === account_Info[1].bank) {
                setAccount_name(account_Info[1].account_name)
                setAccount_no(account_Info[1].account_number)
            } else if (formData.Bank_name === account_Info[2].bank) {
                setAccount_name(account_Info[2].account_name)
                setAccount_no(account_Info[2].account_number)
            } else if (formData.Bank_name === account_Info[3].bank) {
                setAccount_name(account_Info[3].account_name)
                setAccount_no(account_Info[3].account_number)
            }
        }
    }, [])

    const investData = {
        narration: formData.narration,
        Bank_name: formData.Bank_name,
        fileImg: formData.fileImg,
        imginfo: formData.imgfile,
    }

    useEffect(() => {
        if (isInvest === false) {
            checkoutData(investData)
        }
    }, [])

    function copyAcct() {
        navigator.clipboard.writeText(account_no);
        setCopyAlert('Copied')
    }

    function copyNarration() {
        navigator.clipboard.writeText(formData.narration);
        setNCopyAlert('Copied')
    }

    useEffect(() => {
        setCopyAlert('')
        setNCopyAlert('')
    }, [])

    return (
        <div className='checkoutTransfer'>
            <section className='acct'>
                {
                    isInvest && <form className='checkoutTransferForm'>
                        <label>
                            Full Name:
                            <input
                                type='text'
                                name='fullname'
                                value={formData.fullname}
                                onChange={handleChange}
                            // placeholder='Levinv0378'
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            // placeholder='Levinv0378'
                            />
                        </label>
                        <label>
                            Transaction reference:
                            <input
                                type='text'
                                name='txid'
                                value={formData.txid}
                                onChange={handleChange}
                            // placeholder='Levinv0378'
                            />
                        </label>
                    </form>
                }
                {
                    !isInvest && <div className='investForm'>
                        <label htmlFor='narration'>
                            Narration Code
                            <span className='reminder'>
                                Please use this code as your narration when making the transfer
                            </span>
                            <span className='narratCopy' onClick={copyNarration} >
                                <img alt='copy' src='/images/copy.png' />
                            </span>
                            <span className='narratCopy' id='cpyNalrt' >
                                {ncopyAlert}
                            </span>
                        </label>
                        <input
                            type='text'
                            name='narration'
                            value={formData.narration}
                            onChange={handleChange}
                        // placeholder='Levinv0378'
                        />
                    </div>
                }


                <main>
                    <div className='FundingNairaBank'>
                        <main>
                            <div><h3>Account Name: </h3>  <h4>{isAcct ? account_name : ''}</h4></div>
                            <div><h3>Bank Name </h3>
                                <select
                                    value={formData.Bank_name}
                                    onChange={handleChange}
                                    name="Bank_name"
                                    id="network"
                                    required
                                >
                                    <option>Select Bank</option>
                                    {isAcct &&
                                        account_Info.map(option => {
                                            return (
                                                <>
                                                    <option key={option.bank} value={option.bank} name='Bank_no' >
                                                        {option.bank}
                                                    </option>
                                                </>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div><h3>Account Number: </h3>  <h4>{isAcct ? account_no : ''}</h4><img alt='copy' onClick={copyAcct} src='/images/acct_cpy.png' />{copyAlert}</div>
                            <div><h3>Amount: </h3>  <h4>NGN {amount ? totalAmt : ''}</h4></div>
                            <div className="screenshot">
                                <Helpimageupload GetfileImg={GetImg} optional={false} />
                            </div>
                        </main>
                    </div>
                </main>
                <button className='ChckTrfSub' onClick={nextStep} >
                    Payment Completed
                </button>
            </section>
            <section className='brkdwn'>
                <div className='orderbrkdwn'>
                    <h2>Order Breakdown</h2>
                    <ul>
                        <li>
                            Company <strong>Leverpay</strong>
                        </li>
                        <li>
                            Order Number <strong>223456</strong>
                        </li>
                        <li>
                            Product <strong>Shares</strong>
                        </li>
                        <li>
                            Invest Amount <strong>NGN {amount}</strong>
                        </li>
                        <li>
                            VAT <strong>NGN {vat}</strong>
                        </li>
                        <li>
                            Transaction fee (1.3%) <strong>NGN {txfee}</strong>
                        </li>
                    </ul>
                </div>
                <div className='payAmt'>
                    <h2>You have to pay : </h2>
                    <h1><span>NGN</span> {amount ? totalAmt : ''}</h1>
                </div>
                <div className='bckOver' onClick={prevStep} >
                    <img alt='arr' src='/images/bckarr.png' /> Back to order overview
                </div>
            </section>
        </div>
    )
}

export default CheckoutTransfer