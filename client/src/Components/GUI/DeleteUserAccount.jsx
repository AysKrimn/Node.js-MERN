import React from 'react'
import { base_api_url } from '../../shared'

export default function DeleteUserAccount(props) {
    
  const { userId } = props;

  const confirmDeletation = async () => {

        // user hesabı silmek için bir api oluştur.
        const onayla = window.confirm("Hesabınızı silmek üzeresiniz bu işlem bir daha geri alınamaz.")


        if (onayla) {

            // api isteği yap.
            const request = await fetch(`${base_api_url}/user/account/delete`, {

                method: "POST",
                headers: {
          
                    "Authorization": "Bearer " + localStorage.getItem('access_token'),
                    'Content-type': "application/json"
                },
        
                body: JSON.stringify({ user_id: userId })
        
            })


            const response = await request.json()

            console.log("DELETE API:", response)

            if (request.status === 201 && response.data === localStorage.access_token) {

                // hesabı silen kişi userin kendisidir direkt logotu yap
                window.location.href = "/logout"
            }
        }


  }

  return (

    <div>
        <button onClick={confirmDeletation} className='mt-1 p-0 btn btn-link text-danger'>Hesabı Sil</button>
    
    </div>
  )
}
