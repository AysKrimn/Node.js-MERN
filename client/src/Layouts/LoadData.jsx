import React, { useContext, useEffect, useState } from 'react'
import { base_api_url } from '../shared'
import { Outlet } from 'react-router-dom'



// AuthProvider
import { AuthProvider } from '../Context/UserContext'

export default function LoadData() {

    const [loading, setLoading] = useState(true)
    const { setUser } = useContext(AuthProvider)


    useEffect(() => {

        const create_api_request = async () => {

            const access_token = localStorage.getItem('access_token')

            if (access_token) {

                    const request = await fetch(`${base_api_url}/decode?token=${access_token}`)
                    const response = await request.json()

                    console.log("DECODED USER:", response)

                    if (request.status === 200) {

                        // useri setle
                        setUser(response.data)
                    } else if (request.status === 400) {
                        // 400 = invalid token
                        // tokeni kaldir
                        localStorage.removeItem('access_token')
                        // useri login sayfasına yönlendir
                        window.location.href = "/login"
                    }
            }


            // loadingi kaldır

           setLoading(false)
        }

        // ateşle
        create_api_request()

    }, [])


    if (loading) {

        return <div className='container'>

                <p className='text-center'>Yükleniyor lütfen bekleyiniz...</p>
        </div>
    }

  return (


        <>
        
                <div className='container mt-5'>

                    <div className="row">


                        <div className="col-2 left-side-bar">

                            <li>Dashboard</li>
                            <li>Trend</li>
                            <li>Profilim</li>
                            <li>Bildirim</li>

                        </div>


                        <div className="col-10 right-feed">

                            <Outlet></Outlet>
                        
                        </div>

                    </div>
                        
                </div>
    
        
        </>
  )
}
