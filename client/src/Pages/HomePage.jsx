import React, { useContext, useEffect, useState } from 'react'


// MODAL COMPONENT
import CreateTweetModal from '../Components/CreateTweetModal'
import CreateComment from '../Components/CreateComment'

import { AuthProvider } from '../Context/UserContext'
import { base_api_url, base_media_url } from '../shared'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import DeleteTweet from '../Components/DeleteTweet'


// function
const create_string = () => {

      return "---> Devamını okuyayayım"
}

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

             return <div key={post._id} className="col-12 mb-5">

                <div className="d-flex">

                <Link to={`/tweets/${post._id}`}>
                   {create_string()}
                </Link>


                {

                  user !== null && user.user_id === post.author._id ? <DeleteTweet tweet = {post}></DeleteTweet> : null
                }
            

                </div>
              
          
                <h3>{post.author.username}</h3>

                <div className='card-body'>
                    <p>{post.content}</p>

                    {  
                    
                      post.attachment 
                      
                      ? 

                      <div className='image-container'>

                            <img src={`${base_media_url}/${post.attachment}`} alt={post._id} />
                      </div>

                      : null
                    
                    }

                    
                    {

                      user !== null ? <CreateComment  tweet = {post} ></CreateComment> : null
                    }
                   
                </div>

              </div>
        })}
       


   


      </div>
    
    
    </>
  )
}
