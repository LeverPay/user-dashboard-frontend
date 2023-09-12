import React from 'react'
import './CheckoutTransfer.css'
import { useState, useEffect } from 'react'
import Helpimageupload from '../HelpImageUpload/helpimageupload'



const CheckoutTransfer = () => {
    const [fileImg, setFileimg] = useState()
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
        narration: '',
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
    },[formData.Bank_name, account_Info])

    return (
        <div className='checkoutTransfer'>
            <section className='acct'>
                <label>
                    Narration Code
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
                        <h1>Transfer NGN 5,000 to your Account</h1>
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
                            <div><h3>Account Number: </h3>  <h4>{account_no}</h4><img alt='copy'  src='/images/acct_cpy.png' /></div>
                            <div><h3>Amount: </h3>  <h4>NGN 5,000</h4></div>
                            <div className="screenshot">
                            <Helpimageupload GetfileImg={GetImg} optional={false} />
                        </div>
                        </main>
                    </div>
                </main>
                <button className='ChckTrfSub'>
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
                            Invest Amount <strong>NGN 5,000</strong>
                        </li>
                        <li>
                            VAT <strong>NGN 375</strong>
                        </li>
                        <li>
                            Transaction fee (1.3%) <strong>NGN 69.9</strong>
                        </li>
                    </ul>
                </div>
                    <div className='payAmt'>
                        <h2>You have to pay : </h2>
                        <h1><span>NGN</span> 5,400</h1>
                    </div>
                    <div className='bckOver'>
                       <img alt='arr' src='/images/bckarr.png' /> Back to order overview
                    </div>
            </section>
        </div>
    )
}

export default CheckoutTransfer