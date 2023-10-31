import React, { useContext, useEffect, useState } from 'react'
import { base_api_url, base_media_url } from '../shared'
import { useParams } from 'react-router-dom'



// Components
import CreateComment from '../Components/CreateComment'
import ModerationTool from '../Components/ModerationTool'

// AUTH CONTEXT PROVIDER
import { AuthProvider } from '../Context/UserContext'
import TweetCard from '../Components/GUI/TweetCard'


export default function TweetDetail() {
  // states
  const { user } = useContext(AuthProvider)

  const [tweet, setTweet] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const { tweetId } = useParams()

  // show tool
  const handleModerationToolBox = (comment) => {
        // eğer user anomimse çalışma
        if (user === null) {
            return;
        }

        if (comment.author._id === user.user_id ) {
             return <ModerationTool tweetId = {tweet._id} commentId = {comment._id}></ModerationTool>
        }
  }

  useEffect(() => {

        const make_api_request = async () => {

                try {

                    const request = await fetch(`${base_api_url}/tweets/${tweetId}`)
                    const response = await request.json()
                    
                    console.log("TWEET DETAIL RESPONSE :", response)

                    // tweet bulunamazsa
                    if (request.status === 404) {
              
                        setErrors({ error: true, message: response.message})
                        
                    } else if (request.status === 200) {

                        setTweet(response.data)
                    }

                    
                } catch (error) {

                    setErrors({ error: true, message: "Sunucu ile bağlantı sağlanamadı.."})
                    
                } finally {


                    setLoading(false)
                }
          
        }

        // ateşle
        make_api_request()
  }, [])




  // loading true yap
  if (loading) {

    return;
}

// hata var mı?
if (errors.error && errors.error === true) {

    return <div>

            <p>{errors.message}</p>
    </div>
}

  return (


            <>
            
                <TweetCard post = {tweet} user = {user} singleTweet = {true}></TweetCard>


                <div className="row mt-5">

                <div className='d-flex align-items-center'>
                     <h3>Yorumlar</h3>
                  
                     { 

                        user !== null ?  <CreateComment tweet = {tweet}></CreateComment> : null
                     
                     }
                    
                </div>
               
                <hr />


                {/* yorumlar buraya gelecek */}
                {tweet.comments.map((comment) => {

                    return <div key={comment._id} className='col-12 mt-3'>

                            <h3>{comment.author.username}</h3>
                          
                            <div className="card-body">

                              
                     

                            <div className="d-flex align-items-center">
                                 <p className='me-auto'>{comment.message}</p>
                                 {handleModerationToolBox(comment)}
                            </div>

                         </div>
                    </div>


                })}
                </div>
            </>
  )
}
