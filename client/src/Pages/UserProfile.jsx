import React, { useContext, useEffect, useState } from 'react'
import { base_api_url, base_media_url } from '../shared'
import { useParams } from 'react-router-dom'


import { AuthProvider } from '../Context/UserContext'
import AuthGUI from '../Utils/AuthGUI'
import TweetCard from '../Components/GUI/TweetCard'
import DeleteUserAccount from '../Components/GUI/DeleteUserAccount'
export default function UserProfile() {


    const { user, setUser } = useContext(AuthProvider)

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
                document.title = `Profil - ${response.data.user.username}`

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

                        <h3 className='text-center'>{asTitle(userData.user.username)}</h3>

                        <div className='user-avatar-container'>
                             <img src={`${base_media_url}/${userData.user.avatar}`} alt="user-avatar" />


                
                             <div className='text-center'>

                                   {/* <ChangeUserAvatar></ChangeUserAvatar> */}
                                   <AuthGUI 
                                            sessionId = {user?.user_id} 
                                            userId = {userData.user._id} 
                                            label = "edit_user_avatar">
                                   </AuthGUI>
                       
                             </div>
                             
                    
                        </div>
                       

                        </div>


                        {/* kişisel bilgiler */}
                        <div className="col-8">

                        <h3>Hakkında</h3>
                        <hr />
                            
                        <p>
                           <b>GU-ID:</b> {userData.user._id}
                        </p>

                        <p>
                            <b>E-mail:</b> {userData.user.email}
                        </p>


                        <div className='d-flex align-items-center'>

                        <p style={{margin: 0}}>
                            <b>Kullanıcı Rolleri:</b> {userData.user.roles.join(', ')}
                        </p>


                        <AuthGUI label = "edit_user_rank"> </AuthGUI>
                       
                        </div>

                        {

                            user && user?.user_id === userData.user._id || user?.roles.includes('Admin')
                            ?    
                            <DeleteUserAccount userId = {userData.user._id} ></DeleteUserAccount>
                            : 
                                null
                        }
                 
                        
                        </div>
                </div>


                {/* user tweets */}

                <div className="row mt-5">

                <div className="col-12">

                <h3>{userData.user.username} adlı kullanıcının tweetleri ({userData.tweets.length})</h3>
                <hr />


                {userData.tweets.map((tweet) => {

                    return <TweetCard key = {tweet._id} post = {tweet} user = {tweet.author}></TweetCard>

                })}

                </div>



                </div>
        
        </>
  )
}
