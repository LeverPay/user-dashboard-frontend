import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Investment.css'
import CheckoutTransfer from '../../components/CheckoutTransfer/CheckoutTransfer'
import SuccessCheckmark from '../PaymentPage/TransactionMessages/SuccessCheckmark'

const Investment = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(2)
    const [otherData, setOtherData] = useState({})
    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        DOB: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        amount: '',
        vat: '375',
        txfee: '69.9'
    })

    function NextStep(){
        setStep(step + 1)
    }
    function PrevStep(){
        setStep(step - 1)
    }

    const getCheckoutData =(data)=>{
        setOtherData(data)
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleForm(e){
        e.preventDefault()
        NextStep()
    }

    useEffect(()=>{
        if(step === 3){
            console.log('start')
            setTimeout(()=>{
                navigate('/dashboard')
            }, 5 * 1000)
        }
    },[step])

    return (
        <div className='investmentPage'>
            <img alt='logo' src='/images/logo.png' className='logo' />
            {
                step === 1 && <div className='investment'>
                <form onSubmit={handleForm}>
                    <h1>
                        Investment Application Form
                    </h1>
                    <p>
                        Please fill in the form below correctly
                    </p>
                    <label>
                        First Name:
                        <input
                            type='text'
                            required={true}
                            name='firstname'
                            onChange={handleChange}
                            value={formData.firstname}
                        />
                    </label>
                    <label>
                        Middle Name :
                        <input
                            type='text'
                            required={true}
                            name='middlename'
                            onChange={handleChange}
                            value={formData.middlename}
                        />
                    </label>
                    <label>
                        Last Name :
                        <input
                            type='text'
                            required={true}
                            name='lastname'
                            onChange={handleChange}
                            value={formData.lastname}
                        />
                    </label>
                    <label>
                        Gender :
                        <input
                            type='text'
                            required={true}
                            name='gender'
                            onChange={handleChange}
                            value={formData.gender}
                        />
                    </label>
                    <label>
                        Date of Birth
                        <input
                            type='text'
                            required={true}
                            name='DOB'
                            onChange={handleChange}
                            value={formData.DOB}
                        />
                    </label>
                    <label>
                        Email Address
                        <input
                            type='text'
                            required={true}
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </label>
                    <label>
                        Phone Number
                        <input
                            type='text'
                            required={true}
                            name='phone'
                            onChange={handleChange}
                            value={formData.phone}
                        />
                    </label>
                    <label>
                        Country
                        <input
                            type='text'
                            required={true}
                            name='country'
                            onChange={handleChange}
                            value={formData.country}
                        />
                    </label>
                    <label>
                        State
                        <input
                            type='text'
                            required={true}
                            name='state'
                            onChange={handleChange}
                            value={formData.state}
                        />
                    </label>
                    <br />
                    <br />
                    <small id='investAmts'>Please set the amount in multiple of #1,000 or $1</small>
                    <label>
                        Amount
                        <input
                            type='number'
                            required={true}
                            name='amount'
                            onChange={handleChange}
                            value={formData.amount}
                            placeholder='Minimum of #5,000 or $10'
                            
                        />
                    </label>
                    <div className='btns'>
                        <button type='submit'>Proceed to Payment</button>
                        <button>Cancel</button>
                    </div>
                </form>
                <section>
                    <img alt='converter' src='/images/cryptoconverter.png' />
                </section>
            </div>
            }
            {
                step === 2 && <CheckoutTransfer 
                    amount= {formData.amount}
                    vat = {formData.vat}
                    txfee ={(formData.amount * 0.013).toFixed(2)}
                    checkoutData = {getCheckoutData}
                    prevStep = {PrevStep}
                    nextStep = {NextStep}
                /> 

            }
            {
                step === 3 && <SuccessCheckmark text={`Payment Successful ${formData.firstname} ${formData.lastname} `} />
            }
            <img alt='secure' src='/images/secures.png' className='secure' />
        </div>
    )
}

export default Investment