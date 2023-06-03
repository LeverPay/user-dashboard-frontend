import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import './Feedback.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Helpimageupload from '../../components/HelpImageUpload/helpimageupload';

function Feedback(props) {

     const [fileImg, setFileimg] = useState()
   const [imgfile, setImgfile] = useState()
   function GetImg(value, imgInfo){
     setFileimg(value)
     setImgfile(imgInfo)
   }
console.log(imgfile)

  const location = useLocation()
  console.log(location)  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    txid: '',
      fileImg : fileImg,
    imginfo: imgfile

  })


  function onChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  //Number verification
  const [help_name, setHelp_Name] = useState('')
  const [nameFilled, setNameFilled] = useState(false)

  //   message lenght function
  const message = formData.message
  const messageLength = message.length
  // message verification
  const [msg, setMsg] = useState('')
  const [msgFillled, setMsgFilled] = useState(false)


  //Email validation 
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [emailValidityMessage, setEmailValidityMessage] = useState('')


  // prevent form submit for validation 
  const [filled, setFilled] = useState(false)

  function submit(event) {
    event.preventDefault()
    if (formData.email.match(validEmail)) {
      setFilled(true)
      setEmailValidityMessage('Valid Email')
    } else {
      setFilled(false)
      setEmailValidityMessage('Invalid Email Address')
    }
    if (formData.name.length === 0) {
      setNameFilled(false)
      setHelp_Name('Please add your name')
    } else {
      setNameFilled(true)
      setHelp_Name('')
    }
    if (formData.message.length < 20) {
      setMsgFilled(false)
      setMsg('Minimum of 30 characters')
    } else {
      setMsgFilled(true)
      setMsg('')
    }
  }

  const [like, setLike] = useState(false)
  function isLiked() {
    setLike(!like)
  }



  return (
    <Container id="feedback" style={{ marginTop: '4rem' }}>s
      <div className='header'>
        <h1>
          Help!
        </h1>
        <p>
          Should you have face any issue, feel free to contact us we will
          get back to you as soon as we can!
        </p>
      </div>
      <form onSubmit={submit}>
        <main>
          <div className='label'>
            <label htmlFor='name'><img alt='' src='./images/labeluser.png' /></label>
            <input
              name='name'
              type='text'
              placeholder='Name'
              id='name'
              onChange={onChange}
              value={formData.name}
              style={{
                borderBottom: filled ? '2px solid green' : '2px solid '
              }}
            />
          </div>
          <small className='validity' style={{ color: nameFilled ? 'green' : 'red' }}>{help_name}</small>

          <div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              id='email'
              onChange={onChange}
              value={formData.email}
              style={{
                borderBottom: filled ? '2px solid green' : '2px solid'
              }}
            />
          </div>
          <div>
            <input
              name='txid'
              type='text'
              id='txid'
              onChange={onChange}
              // value={formData.txid}
              value={location.state.txid}
              placeholder='Transaction ID (Generate invoice to get TXID)'
            />
          </div>
          <small className='validity' style={{ color: filled ? 'green' : 'red' }}>{emailValidityMessage}</small>


          <div className='label'>
            <label htmlFor='message'><img alt='' src='./images/message.png' /></label>
            <textarea
              name='message'
              type='text'
              placeholder='Message'
              id='message'
              maxLength='500'
              onChange={onChange}
              value={formData.message}
            />
          </div>
          <div >
            <Helpimageupload GetfileImg = {GetImg} />
          </div>
          <small className='validity' style={{ color: msgFillled ? 'green' : 'red' }}>{msg}</small>

          <div className='submitCon'>
            <span>
              {messageLength}/500 characters
            </span>
            <input
              name='submit'
              type='submit'
              value='Send'
              id='submit'
            />
          </div>

        </main>
      </form>
      <div className='contact'>
        <p>
          Call/Chat Us
        </p>
        <ul>
          <li><a href='tel:2347066080819'><img alt='' src='./images/call.png' />+234  7068936384 </a></li>
          <li><a href='https://api.whatsapp.com/send?phone=2347066080819&text=Hello Leverpay' target='blank'><img alt='' src='./images/whatsapp.png' />+234  7068933455 </a></li>
          <li><img alt='' id='thumbs' src='./images/thumbs.png' onClick={isLiked} style={{ filter: like ? 'brightness(50%)' : 'brightness(100%)', cursor: 'pointer' }} /></li>
          <li>Send us a mail @<a href='mailto:' target='blank' >Leverpay001@gmail.com</a></li>
        </ul>
      </div>
      <div>
        <Link to= '/transactions'>
        <p style={{width: '100%', color: 'white', textDecoration: 'underline', fontSize: '20px'}}>Return to Home</p>
        </Link>
      </div>
    </Container>
  )
}

export default Feedback