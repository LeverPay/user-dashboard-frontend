import React, { useEffect, useState } from 'react'
import Invoice from './Invoice'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useLocalState } from '../../../utils/useLocalStorage';
import './invoice.css'


const PaidInvoice = () => {
    const location = useLocation();
    const { state } = location;
    const InvoiceId = state
    const [data, setData] = useState({})
    const [isdata, setIsdata] = useState(false)
    const [jwt, setJwt] = useLocalState('', 'jwt')

    useEffect(() => {
        axios.get(`https://leverpay-api.azurewebsites.net/api/v1/invoice/${InvoiceId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        .then(res=>{
            console.log(res)
            setData(res.data.data)
            if(res.status === 200){
                setIsdata(true)
            }else setIsdata(false)
        })
        .catch(err=>{
            console.log(err)
            setIsdata(false)
        })
    })

    return (
        <>
        {
            isdata && data.map(item=>{
                return  <Invoice
                name={item.product_name}
                productType={item.product_description}
                amt={item.price}
                email={item.email}
                currency={item.currency}
                status={item.status}
                unpaid={false}
                date={item.date}
                cancel='invoices'
            />
            })
        }
        {
            !isdata && <h3 className='pd-invoice-nt'>Invoice not found</h3>
        }
        </>
    )
}

export default PaidInvoice