import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import './Helpform.css'
import { useState } from 'react'

function HelpForm() {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    countryCode : '',
    phoneNumber: '',
    help: ''
  })

  function onChange (event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name] : event.target.value
      }
     
    })
  }

   //Email validation 
   const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
   const [emailValidityMessage, setEmailValidityMessage] = useState('')

  //  phone verification
  const [phoneValidityMessage, setPhoneValidityMessage] = useState('')

  // check if input is empty
  const [filled, setFilled] = useState(false)
  
  function submit (event){
    event.preventDefault()
    if(formData.firstname.length > 0 && formData.lastname.length > 0 && formData.email.match(validEmail)){
      setFilled(true)
      setEmailValidityMessage('Valid Email Address')
      setPhoneValidityMessage('Invalid phone number')
    }else{
      setFilled(false)
      setEmailValidityMessage('Invalid Email Address')
      setPhoneValidityMessage('Valid phone Number')
    }

  }

  return (
    <Container className="px-4  text-center" id="Helpform" style={{ marginTop: '7rem' }}>
      <form onSubmit={submit}>
        <section className='name'>
          <main>
            <label htmlFor='firstname'>First Name</label>
            <input
            name='firstname'
            type='text'
            id='firstname'
            placeholder='e.g Jane'
            onChange={onChange}
            value={formData.firstname}
            />
          </main>
          <main>
            <label htmlFor='lastname'>Last Name</label>
            <input
            name='lastname'
            type='text'
            id='lastname'
            placeholder='e.g Olusegan'
            onChange={onChange}
            value={formData.lastname}
            />
          </main>
        </section>
        <div>
          <label htmlFor='phno'>
            What's your phone number? (Optional)
          </label>
          <main className='number'>
            <input
            name='countryCode'
            type='text'
            id='countryCode'
            placeholder='+234'
            onChange={onChange}
            value={formData.countryCode}
          />
          <input
            name='phoneNumber'
            type='text'
            id='phoneNumber'
            placeholder='803 300 3300'
            onChange={onChange}
            value={formData.phoneNumber}
          />
          </main>
          <span className='valid' style={{color: filled ? 'green' : 'red'}}> {phoneValidityMessage}</span>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            id='email'
            placeholder='mail@mail.com'
            onChange={onChange}
            value={formData.email}
          />
          <span className='valid' style={{color: filled ? 'green' : 'red'}}> {emailValidityMessage}</span>
        </div>
        <div>
          <label htmlFor='help'>How can we help? </label>
          <select value={formData.help} onChange={onChange} id='help' name='help' placeholder='Select Category'>
            <option value='Select Category'>Select Category</option>
            <option value='paymentIssue'>Payment Issue</option>
            <option value='upgradeCard'>Unable to Uprade Card</option>
            <option value='delayedDeposit'>Delayed Deposit of Funds</option>
          </select>
        </div>
     <div className='submitCon'>
         <input
          name='submit'
          type='submit'
          id='submit'
          value= 'Send your message'
        />
     </div>
      </form>
      <article>
          <header>
            <h1>
              Contact Support
            </h1>
            <p>
              We're available around the clock. Let us know how we can help!
            </p>
          </header>
          <main>
            <h2>
              Need a quick answer? 
            </h2>
            <p>
              Call/Chat Us 
            </p>
            <ul>
              <li><a href='tel:2347066080819'><img alt='' src='./images/call.png' />+234  7068936384 </a></li>
              <li><a href='https://api.whatsapp.com/send?phone=2347066080819&text=Hello Leverpay' target='blank'><img alt='' src='./images/whatsapp.png' />+234  7068933455 </a></li>
              <li><a href='https://t.me/+2347066080819' target='blank' ><img alt='' src='./images/telegram.png'/>+234  7068933455 </a></li>
            </ul>
          </main>
          <small>
            <img alt='' src='./images/helpDesk.png'/> 
            Search the help desk 
          </small>
      </article>
    </Container>
  )
}

export default HelpForm