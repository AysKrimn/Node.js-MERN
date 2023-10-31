import React from 'react'
import DeleteTweet from '../DeleteTweet'
import CreateComment from '../CreateComment'
import { base_media_url } from '../../shared'
import { Link } from 'react-router-dom'





export default function TweetCard(props) {

  const { post, user, singleTweet } = props


    // function
    const create_string = () => {

        if (singleTweet)
            return;
        return "---> Devamını okuyayayım"
    }



  return (

    <div key={post._id} className="col-12 mb-5 tweetModel">

    <div className="d-flex">

    <Link to={`/tweets/${post._id}`}>
       {create_string()}
    </Link>


    {

      user !== null && user.user_id === post.author._id ? <DeleteTweet tweet = {post}></DeleteTweet> : null
    }


    </div>
  

    <div className='author mt-2'>
            <Link to={`/users/${post.author.username}`}>{post.author.username}</Link>
    </div>


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
  )
}
