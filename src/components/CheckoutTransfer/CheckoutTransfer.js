import React from 'react'
import './CheckoutTransfer.css'
import { useState, useEffect } from 'react'
import Helpimageupload from '../HelpImageUpload/helpimageupload'



const CheckoutTransfer = ({amount, checkoutData, vat, txfee, prevStep, nextStep}) => {
    const totalAmt = (amount * 1) + (vat*1) + (txfee*1)
    const [fileImg, setFileimg] = useState()
    const [copyAlert, setCopyAlert] = useState('')
    const [ncopyAlert, setNCopyAlert] = useState('')
    const [imgfile, setImgfile] = useState()
    function GetImg(value, imgInfo) {
        setFileimg(value)
        setImgfile(imgInfo)
    }

    const account_Info = [
        { name: 'GT Bank', number: '0054789923' },
        { name: 'First Bank', number: '3120789923' },
        { name: 'Kuda Bank', number: '2054569929' },
        { name: 'Providus Bank', number: '9105479905' }
    ]

    const [account_no, setAccount_no] = useState(account_Info[0].number)

    const [formData, setFormData] = useState({
        narration: 'leverpay20752',
        Bank_name: account_Info[0].name,
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
      if (formData.Bank_name === account_Info[0].name) {
        return setAccount_no(account_Info[0].number)
      } else if (formData.Bank_name === account_Info[1].name) {
        return setAccount_no(account_Info[1].number)
      } else if (formData.Bank_name === account_Info[2].name) {
        return setAccount_no(account_Info[2].number)
      } else if (formData.Bank_name === account_Info[3].name) {
        return setAccount_no(account_Info[3].number)
      }
    },[formData.Bank_name])

    useEffect(()=>{
        checkoutData(formData)
    },[formData])

    function copyAcct() {
        navigator.clipboard.writeText(account_no);
        setCopyAlert('Copied')
      }

    function copyNarration (){
        navigator.clipboard.writeText(formData.narration);
        setNCopyAlert('Copied')
    }

    useEffect(()=>{
        setCopyAlert('')
        setNCopyAlert('')
    }, [])

    return (
        <div className='checkoutTransfer'>
            <section className='acct'>
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

                <main>
                    <div className='FundingNairaBank'>
                        <main>
                            <div><h3>Account Name: </h3>  <h4>Leverchain Technology Limited</h4></div>
                            <div><h3>Bank Name </h3>
                                <select
                                    value={formData.Bank_name}
                                    onChange={handleChange}
                                    name="Bank_name"
                                    id="network"
                                    required
                                >
                                    {
                                        account_Info.map(option => {
                                            return (
                                                <option key={option.name} value={option.name} name='Bank_no' >
                                                    {option.name}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div><h3>Account Number: </h3>  <h4>{account_no}</h4><img alt='copy' onClick={copyAcct} src='/images/acct_cpy.png' />{copyAlert}</div>
                            <div><h3>Amount: </h3>  <h4>NGN {totalAmt}</h4></div>
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
                        <h1><span>NGN</span> {totalAmt}</h1>
                    </div>
                    <div className='bckOver' onClick={prevStep} >
                       <img alt='arr' src='/images/bckarr.png' /> Back to order overview
                    </div>
            </section>
        </div>
    )
}

export default CheckoutTransfer