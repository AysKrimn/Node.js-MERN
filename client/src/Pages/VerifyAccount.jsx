import React from 'react'

export default function VerifyAccount() {
  return (


    <div className='container mt-5'>

        <h3>Devam Etmeden Önce Hesabınızı Onaylayın</h3>
        <hr />

        <form action="?">

                <div className='mb-3'>
                        <input type="text"  placeholder='Doğrulama Kodu'/> 
                </div>
       
                <div className='mb-3'>
                        <span className='text-muted'>Lütfen email adresinizi kontrol edin, bulamazsanız spam klasörünü kontrol edin.</span>
                </div>
                <button className='btn btn-success'>Onayla</button>
        </form>
     
    </div>
  )
}
