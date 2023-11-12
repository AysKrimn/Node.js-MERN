import React, { useContext, useEffect, useState } from 'react'


// MODAL COMPONENT
import CreateTweetModal from '../Components/CreateTweetModal'
import { AuthProvider } from '../Context/UserContext'
import { base_api_url } from '../shared'

import Alert from 'react-bootstrap/Alert';
import TweetCard from '../Components/GUI/TweetCard'
import AuthGUI from '../Utils/AuthGUI';






export default function HomePage() {

  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [retrive, setRetrive] = useState("all")
  const [text, setText] = useState({ class: "text text-primary", message: "Daha Fazla Tweet Yükle" })

  const { user } = useContext(AuthProvider)

  useEffect(() => {

      const get_all_tweets = async () => {

          try {

            const request = await fetch(`${base_api_url}/tweets?get=${retrive}`)
            const response = await request.json()
  
            console.log("GET ALL TWEETS:", response)

            if (!response.data.length) {

              setText({...text, class: "text text-warning", message: "Keşfet bitmiş gibi görünüyor."})

            } else {
                setPosts([ ...posts, ...response.data ])
            }
        
            
          } catch (error) {

            setError(true)
            
          }
  

      }
      // ateşle
      get_all_tweets()

  }, [retrive])
 

  // infintyScroll
  const handleInfintyScroll = (event) => {
    
      const { offsetHeight, scrollTop , scrollHeight } = event.target

      console.log("Offset:", offsetHeight, "ScrollTop:", scrollTop, "ScrollHeight:", scrollHeight)
      if (offsetHeight + scrollTop + 1 >= scrollHeight) {

          // backend den bir 10 tweet daha getir
          setRetrive(posts.length)
      }
  }

  return (


    <>

   

      <div className="d-flex align-items-center">

      <h3>Tweets</h3>


      <AuthGUI label = "create_tweet"></AuthGUI>
      

      </div>

      <hr />


      <div className="row">


        {/* eğer sunucu ile bağlantı sağlanamamışsa */}
        {
          error ? <Alert variant={"danger"}>Sunucu ile bağlantı sağlanamadı.</Alert> : null

        }

        {posts.map((post) => {
          
             return <TweetCard post={post} user = {post.author} ></TweetCard>
        })}
       

        
        <div className='text-center'>
              <p onClick={handleInfintyScroll} className={text.class} style={{ display: "inline-block", cursor: "pointer"}}>{text.message}</p>
        </div>
   


      </div>
    
    
    </>
  )
}
