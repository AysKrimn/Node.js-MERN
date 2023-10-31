import React, { useContext, useEffect, useState } from 'react'


// MODAL COMPONENT
import CreateTweetModal from '../Components/CreateTweetModal'
import { AuthProvider } from '../Context/UserContext'
import { base_api_url } from '../shared'

import Alert from 'react-bootstrap/Alert';
import TweetCard from '../Components/GUI/TweetCard'





export default function HomePage() {

  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthProvider)

  useEffect(() => {

      const get_all_tweets = async () => {

          try {

            const request = await fetch(`${base_api_url}/tweets`)
            const response = await request.json()
  
            console.log("GET ALL TWEETS:", response)
            setPosts(response.data)
            
          } catch (error) {

            setError(true)
            
          }
  

      }
      // ateşle
      get_all_tweets()

  }, [])
 
  return (


    <>
    

      <div className="d-flex align-items-center">

      <h3>Tweets</h3>

      {
        user !== null ? <CreateTweetModal user = {user} ></CreateTweetModal> : null
      }
      

      </div>

      <hr />


      <div className="row">


        {/* eğer sunucu ile bağlantı sağlanamamışsa */}
        {
          error ? <Alert variant={"danger"}>Sunucu ile bağlantı sağlanamadı.</Alert> : null

        }

        {posts.map((post) => {

             return <TweetCard post={post} user = {user} ></TweetCard>
        })}
       


   


      </div>
    
    
    </>
  )
}
