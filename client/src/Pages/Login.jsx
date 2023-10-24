import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { base_api_url } from '../shared'
import { AuthProvider } from '../Context/UserContext'



export default function Login() {
  
  // states
  const [error, setError] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const make_api_request = async (event) => {

        event.preventDefault()

        const payload = { username, password}
        const request = await fetch(event.target.action, {

           method: "POST",
           headers: {

              "Content-type": "application/json"

           },

           body: JSON.stringify(payload)
        })

        const response = await request.json()
        console.log("GELEN SV RESPONSE:", response)

        if (request.status > 299) {

            setError(response.message)

        } else if (request.status === 200) {

                // localstorege token gir
                localStorage.setItem("access_token", response.data)
                // dashboarda yönlendir
                window.location = "/"

        }

  }
  
  
  return (

    
    <>
    


    <div className="container mt-5">


    <div className="w-50">

    <h3>Giriş Yap</h3>
    <hr />
    
    <form action={`${base_api_url}/login`} onSubmit={make_api_request}>
      
            <p className='text-danger'>{error}</p>

            <div className='mb-3'>

                <input type="text" placeholder='Kullanıcı Adı veya E-mail' className='form-control' 
                onChange={(e) => setUserName(e.target.value)} value={username}
                
                />
            </div>


            <div className='mb-3'>

                <input type="password" placeholder='Şifre' className='form-control' 
                 onChange={(e) => setPassword(e.target.value)} value={password}

                />
            </div>

            <div className='mb-3'>

                <p>Hesabınız yoksa hemen <Link to="/register">oluştur</Link> </p>
            </div>

            <div>
                <button className='btn btn-success' type='submit'>Giriş Yap</button>
            </div>
    </form>


    </div>

    </div>
    </>
  )
}
