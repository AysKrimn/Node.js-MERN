import React, { useContext, useEffect, useState } from 'react'


// MODAL COMPONENT
import CreateTweetModal from '../Components/CreateTweetModal'
import CreateComment from '../Components/CreateComment'

import { AuthProvider } from '../Context/UserContext'
import { base_api_url } from '../shared'
import { Link } from 'react-router-dom'


// function
const create_string = () => {

      return "---> Devamını okuyayayım"
}

export default function HomePage() {

  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthProvider)

  useEffect(() => {

      const get_all_tweets = async () => {

          const request = await fetch(`${base_api_url}/tweets`)
          const response = await request.json()

          console.log("GET ALL TWEETS:", response)
          setPosts(response.data)

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

        {posts.map((post) => {

             return <div key={post._id} className="col-12 mb-5">

                <Link to={`/tweets/${post._id}`}>
                   <p>{create_string()}</p>
                </Link>
          
                <h3>{post.author.username}</h3>

                <div className='card-body'>
                    <p>{post.content}</p>

                    <CreateComment  tweet = {post} ></CreateComment>
                </div>

              </div>
        })}
       


   


      </div>
    
    
    </>
  )
}
