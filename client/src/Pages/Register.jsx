import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { base_api_url } from '../shared'

export default function Register() {

  // states
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")

  // navigate
  const yonlendir = useNavigate()

  const make_api_request = async (event) => {

        // sayfanın yenilenmesini önle
        event.preventDefault()

        const payload = {

            email,
            userName,
            password,
            password2
        }

        // api isteği yap
        const request = await fetch(event.target.action, {

            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(payload)
        })

        const response = await request.json()

        console.log("GELEN YANIT:", response)

        // potensiyel tüm hatalar
        if (request.status > 299) {

            setError(response.message)

        } else if (request.status === 200) {

            alert(response.message)
            // login sayfasına yönlendir
            yonlendir("/login")
        }
  }

  return (

    


    <div className="container mt-5">

    <div className="w-50">

    <h3>Kayıt Ol</h3>
    <hr />
    
    <form action={`${base_api_url}/register`} onSubmit={make_api_request}>

            <p className='text-danger'>{error}</p>
            <div className='mb-3'>

                <input type="email" placeholder='E-mail' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='mb-3'>

                <input type="text" placeholder='KullanıcıAd' className='form-control' value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className='mb-3'>

                <input type="password" placeholder='Şifre' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>


            <div className='mb-3'>

                <input type="password" placeholder='Şifre Tekrar' className='form-control' value={password2} onChange={(e) => setPassword2(e.target.value)} />
            </div>

            <div className='mb-3'>

                <p>Hesabınız varsa <Link to="/login">buradan giriş yapın</Link>  </p>
            </div>

            <div>
                <button className='btn btn-success' type='submit'>Kayıt Ol</button>
            </div>
    </form>


    </div>

    </div>


  )
}
