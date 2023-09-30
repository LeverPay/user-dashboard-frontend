import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Investment.css'
import CheckoutTransfer from '../../components/CheckoutTransfer/CheckoutTransfer'
import SuccessCheckmark from '../PaymentPage/TransactionMessages/SuccessCheckmark'
import { Country, State}  from 'country-state-city';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Investment = () => {
    const navigate = useNavigate()
    const [info, setInfo] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [step, setStep] = useState(1)
  const [isvisible, setIsvisible] = useState(false)
    const [otherData, setOtherData] = useState({})
    const [DOB, setDOB] = useState(new Date());
    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        DOB: DOB,
        email: '',
        phone: '',
        country: 'AF, Afghanistan',
        state: '',
        password: '',
        Cpassword: '',
        amount: '',
        vat: '375',
        txfee: '69.9'
    })

    function toggleVisible(){
        setIsvisible(!isvisible)
      }
    
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

    const countryOpts = Country.getAllCountries()
    const stateOfCountry = State.getStatesOfCountry(formData.country.slice(0,2))

    function handleForm(e){
        e.preventDefault()
        if(formData.password === formData.Cpassword){
            setInfo('')
            NextStep()
        }
        else{
            setInfo('Password does not match')
        }
    }
    function handleCheck(){
        setIsChecked(!isChecked)
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
            <img alt='logo' src='/images/logo.png' className='i-logo' />
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
                       <select value={formData.gender} name='gender'onChange={handleChange} required={true} >
                        <option>Select your gender</option>
                        <option value='male' >Male</option>
                        <option value='female'>Female</option>
                       </select>
                    </label>
                    <div id='dob'>
                        <p>Date of Birth</p>
                        <span>
                        <DatePicker selected={DOB} onChange={(date) => setDOB(date)}  wrapperClassName="datePicker" />
                        </span>
                    </div>
                    
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
                        <select value={formData.country} name='country'onChange={handleChange} required={true} >
                            {
                                countryOpts && countryOpts.map(item =>{
                                    return <option value={`${item.isoCode}, ${item.name}`} key={item.isoCode} className='invest-country' >{item.name}</option>
                                })
                            }
                       </select>
                    </label>
                    <label>
                        State
                        <select value={formData.state} name='state'onChange={handleChange} required={true} >
                            {
                                stateOfCountry && stateOfCountry.map(item =>{
                                    return <option value={`${item.name}`} key={item.isoCode} >{item.name}</option>
                                })
                            }
                       </select>
                    </label>
                    <label>
                        Password:
                       <input
                        type={isvisible ? 'text': 'password'}
                        required={true}
                        name='password'
                        onChange={handleChange}
                        value={formData.password}
                       />
                       <img alt="" src={isvisible ? "/images/blind.png" : "/images/visible.png"} onClick={toggleVisible} className="i-visible-blind" />
                    </label>
                    <label>
                        Confirm Password:
                       <input
                        type={isvisible ? 'text': 'password'}
                        required={true}
                        name='Cpassword'
                        onChange={handleChange}
                        value={formData.Cpassword}
                       />
                       <img alt="" src={isvisible ? "/images/blind.png" : "/images/visible.png"} onClick={toggleVisible} className="i-visible-blind" />
                    </label>
                     <small>{info}</small>
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
                            min={5000}
                            
                        />
                    </label>
                    <div className='ndpr'>
                        <input
                            type='checkbox'
                            name='checkmark'
                            checked={isChecked}
                            onChange={handleCheck}
                        />
                        <small>
                            We are NDPR compliant. By proceeding with this application, you agreeto the storage and usage of your data by LSETF in accordance with our privacy policy. 
                        </small>
                    </div>
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
                    isInvest = {false}
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