import React, { useContext, useEffect, useState } from 'react'
import { base_api_url } from '../shared'
import { Outlet } from 'react-router-dom'


// AuthProvider
import { AuthProvider } from '../Context/UserContext'

// Routes 
export const sidebar_routes = [

    { label: "Dashboard", href: "/" },
   
]

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
                        
                        // navalinkse ekle

                        if (!sidebar_routes.includes({ label: "Profilim", href: `/users/${response.data.username}` }))
                                    sidebar_routes.push({ label: "Profilim", href: `/users/${response.data.username}` })

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
        
             <Outlet></Outlet>
    
        
        </>
  )
}
