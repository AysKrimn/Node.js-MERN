import React, { useContext, useEffect, useState } from 'react'
import { base_api_url, base_media_url } from '../shared'
import { useParams } from 'react-router-dom'



// Components
import CreateComment from '../Components/CreateComment'

// AUTH CONTEXT PROVIDER
import { AuthProvider } from '../Context/UserContext'
import TweetCard from '../Components/GUI/TweetCard'
import CommentCard from '../Components/GUI/CommentCard'


export default function TweetDetail() {
  // states
  const { user } = useContext(AuthProvider)

  const [tweet, setTweet] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const { tweetId } = useParams()


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
            
                <TweetCard post = {tweet} user = {tweet.author} singleTweet = {true}></TweetCard>


                <div className="row mt-5">

                <div className='d-flex align-items-center'>
                     <h3>Yorumlar</h3>

                </div>
               
                <hr />


                {/* yorumlar buraya gelecek */}
                {tweet.comments.map((comment) => {

                    return <CommentCard user = {user} post = {tweet} comment = {comment} > </CommentCard>


                })}
                </div>
            </>
  )
}
