import React from 'react'
import { useState } from 'react'
import './InvestmentForm.css'

const InvestmentForm = () => {
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
        amount: ''
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='investment'>
            <form>
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
                        name='firstname'
                        onChange={handleChange}
                        value={formData.firstname}
                    />
                </label>
                <label>
                    Middle Name :
                    <input
                        type='text'
                        name='middlename'
                        onChange={handleChange}
                        value={formData.middlename}
                    />
                </label>
                <label>
                    Last Name :
                    <input
                        type='text'
                        name='lastname'
                        onChange={handleChange}
                        value={formData.lastname}
                    />
                </label>
                <label>
                    Gender :
                    <input
                        type='text'
                        name='gender'
                        onChange={handleChange}
                        value={formData.gender}
                    />
                </label>
                <label>
                    Date of Birth
                    <input
                        type='text'
                        name='DOB'
                        onChange={handleChange}
                        value={formData.DOB}
                    />
                </label>
                <label>
                    Email Address
                    <input
                        type='text'
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                    />
                </label>
                <label>
                    Phone Number
                    <input
                        type='text'
                        name='phone'
                        onChange={handleChange}
                        value={formData.phone}
                    />
                </label>
                <label>
                    Country
                    <input
                        type='text'
                        name='country'
                        onChange={handleChange}
                        value={formData.country}
                    />
                </label>
                <label>
                    State
                    <input
                        type='text'
                        name='state'
                        onChange={handleChange}
                        value={formData.state}
                    />
                </label>
                <br />
                <br />
                <small>Please set the amount in multiple of #1,000 or $1</small>
                <label>
                    Amount
                    <input
                        type='text'
                        name='amount'
                        onChange={handleChange}
                        value={formData.amount}
                        placeholder='Minimum of #5,000 or $10'
                    />
                </label>
                <div className='btns'>
                    <button>Proceed to Payment</button>
                    <button>Cancel</button>
                </div>
            </form>
            <section>
                <img alt='converter' src='/images/cryptoconverter.png' />
            </section>
        </div>
    )
}

export default InvestmentForm