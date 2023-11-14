import React, { useEffect } from 'react'

export default function Logout() {
  
    useEffect(() => {

        document.title = "Çıkış Yapılıyor..."
        // access_tokeni revoke et
        window.localStorage.removeItem('access_token')
        // anasayfaya yonlendir
        window.location.href = '/'

    }, [])
  
  
    return (


        <>
        
        </>
  )
}
