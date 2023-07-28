import React, { useState } from 'react'
import FundingInitiating from './FundingInitiating'


const FundingpaymentForm = () => {
    const [step, setstep] = useState(1)
    const [formData, setFormData] = useState({
        
    })

    function NextStep (){
        setstep(step + 1)
    }
    function PrevStep (){
        setstep(step - 1)
    }
  return (
    <div>
        <FundingInitiating/>
    </div>
  )
}

export default FundingpaymentForm