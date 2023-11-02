import React, { useEffect, useState } from 'react'
import { base_api_url, base_media_url } from '../shared'
import { useParams } from 'react-router-dom'



// components
import HandleUserRank from '../Components/HandleUserRank'
import ChangeUserAvatar from '../Components/ChangeUserAvatar'

export default function UserProfile() {

    const [ userData, setUserData ] = useState(null)
    const [ error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const { userName } = useParams()

    useEffect(() => {

        const make_api_request = async () => {
            try {

             const request = await fetch(`${base_api_url}/users/${userName}`)
             const response = await request.json()
             console.log("USER ENDPOINT:", response)
             // status kod 404 ise
             if (request.status === 404) {
                setError(response.message)
             // başarılı ise
             } else if (request.status === 200) {
                setUserData(response.data)
             }
            } catch (error) {
                
                setError("Bir hata meydana geldi lütfen daha sorna tekrar dene.")

            } finally {
                // yükleniyor ekranını kaldır
                setLoading(false)
            }

        }

        make_api_request()

    }, [userName])


  // helper function (hesap adının ilk harfini büyütür.)
  const asTitle = (username = "") => {

        return username.charAt(0).toUpperCase() + userName.slice(1)

  }

  if (loading) {

    return <div>

            <p className='text-center'>Yükleniyor lütfen bekleyiniz..</p>
    </div>
  }



  // eğer user bulunamamışsa
  if (userData === null) {

    return <div className='alert alert-danger'>

            <p>{error}</p>
    </div>

  }

  return (

        <>
        
                <div className="row">

                        {/* avatar ve username */}
                        <div className="col-4">

                        <h3 className='text-center'>{asTitle(userData.username)}</h3>

                        <div className='user-avatar-container'>
                             <img src={`${base_media_url}/${userData.avatar}`} alt="user-avatar" />


                             <div className='text-center'>

                                   <ChangeUserAvatar></ChangeUserAvatar>
                             </div>
                        </div>
                       

                        </div>


                        {/* kişisel bilgiler */}
                        <div className="col-8">

                        <h3>Hakkında</h3>
                        <hr />
                            
                        <p>
                           <b>GU-ID:</b> {userData._id}
                        </p>

                        <p>
                            <b>E-mail:</b> {userData.email}
                        </p>


                        <div className='d-flex align-items-center'>

                        <p style={{margin: 0}}>
                            <b>Kullanıcı Rolleri:</b> {userData.roles.join(', ')}
                        </p>


                        <HandleUserRank user = {userData}></HandleUserRank>

                        </div>
                        
                        
                        </div>
                </div>


                {/* user tweets */}

                <div className="row mt-5">

                <div className="col-12">

                <h3>{userData.username} adlı kullanıcının tweetleri</h3>
                <hr />


                </div>



                </div>
        
        </>
  )
}
