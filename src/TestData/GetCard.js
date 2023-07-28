import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocalState } from '../utils/useLocalStorage'

const GetCard = () => {
    const baseurl = 'https://api.leverpay.io/api/v1/user/get-card'
    const [data, setData] = useState({})
    const [jwt, setJwt] = useLocalState('', 'jwt')
    console.log(jwt)

    useEffect(()=>{
        axios.get(baseurl, {
            headers: {
                Authorization : `Bearer ${jwt}`
            }
        })
        .then((res) => {
            setData(res.data);
          })
        .catch(error =>{
            console.log(error)
        })
    }, [])
    console.log(data.data)
  return (
        data
  )
}

export default GetCard





