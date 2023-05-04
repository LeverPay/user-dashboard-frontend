import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import './Helpform.css'
import { useState } from 'react'
import PhoneInput from "react-phone-input-2";


function HelpForm() {

  //  select default option
  const defSelect = 'Select Category'

  const [value, setValue] = useState("")
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    help: defSelect
  })

  function onChange (event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name] : event.target.value
      }
    })
  }
 console.log(formData.help)

  // validate name 
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')

   //Email validation 
   const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
   const [emailValidityMessage, setEmailValidityMessage] = useState('')


  // selected or not message
  const [selected, setSelected] = useState('')



  // check if input is empty
  const [filled, setFilled] = useState(false)
  const [emailfilled, setEmailFilled] = useState(false)
  const [selectfilled, setSelectFilled] = useState(false)
  
  function submit (event){
    event.preventDefault()
    if(formData.firstname.length > 0){
      setFilled(true)
      setFirstName('')
    }else{
      setFilled(false)
      setFirstName('Name is required')
    }
    if(formData.lastname.length > 0){
      setFilled(true)
      setLastName('')
    }else{
      setFilled(false)
      setLastName('Name is required')
    }
    if(formData.email.match(validEmail)){
      setEmailFilled(true)
      setEmailValidityMessage('Valid Email Address')
    }else if(formData.email.length < 2){
      setEmailFilled(false)
      setEmailValidityMessage('Email Address is required')
    }
    else{
      setEmailFilled(false)
      setEmailValidityMessage('Invalid Email Address')
    }
    
    // select option checked
    if(formData.help===defSelect){
      setSelectFilled(false)
      setSelected('Select a category')
    }else{
      setSelectFilled(true)
      setSelected('')
    }

  }
  console.log(value)

  return (
    <Container  id="Helpform" style={{ marginTop: '7rem' }}>
      <div className='form_con'>
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
            <span className='valid' style={{color: filled ? '': 'red'}}> {firstname}</span>
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
            <span className='valid' style={{color: filled ? '': 'red'}} > {lastname}</span>
          </main>
        </section>
        <div className="phone-input">
        <label htmlFor='phno'>
            What's your phone number? (Optional)
          </label>
          <PhoneInput
            country={"ng"}
            value={value.phone}
            onChange={(phone) => setValue({ phone })}
            inputStyle={{ width: "80%", fontFamily: "AgrandirBold", marginLeft: '3rem', zIndex: '40', backgroundColor:'white'}}
            dropdownStyle={{ fontFamily: "AgrandirBold", marginTop: '3rem', marginLeft: '0rem', width: '300px', padding: '1rem 1rem' }}
            buttonStyle={{backgroundColor: 'white'}}
            specialLabel=''
            searchStyle={{width:'100%', padding: '5px', border: '1px solid gray', marginLeft: '0px',outline: '5px solid white'}}
            placeholder=""
            id="phno"
            enableSearch ={true}
            disableSearchIcon={true}
            countryCodeEditable={false}
          />
        </div>
        <div className='email_con'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text' 
            id='email'
            placeholder='mail@mail.com'
            onChange={onChange}
            value={formData.email}
          />
          <span className='valid' style={{color: emailfilled ? 'green' : 'red'}}> {emailValidityMessage}</span>
        </div>
        <div>
          <label htmlFor='help'>How can we help? </label>
          <select value={formData.help} onChange={onChange} id='help' name='help' placeholder='Select Category' required>
            <option value='Select Category'>{defSelect}</option>
            <option value='paymentIssue'>Payment Issue</option>
            <option value='upgradeCard'>Unable to Uprade Card</option>
            <option value='delayedDeposit'>Delayed Deposit of Funds</option>
          </select>
          <span className='valid' style={{color: selectfilled ? '': 'red'}}> {selected}</span>
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
      </div>


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