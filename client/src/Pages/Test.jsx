import React, { useEffect, useState } from 'react'



export default function Test() {

    useEffect(() => {

        const make_api_request = async () => {

            const request = await fetch("http://localhost:4000/api/v1/all")
            const response = await request.json()
            console.log("VERİ:", response)
        }
 
        make_api_request()
    }, [])


  return (
    <div>
      
      <h1>TEST SAYFASI</h1>
    </div>
  )
}
