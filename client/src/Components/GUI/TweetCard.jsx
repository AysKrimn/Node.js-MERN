import React from 'react'
import DeleteTweet from '../DeleteTweet'
import CreateComment from '../CreateComment'
import { base_media_url } from '../../shared'
import { Link } from 'react-router-dom'

// İKONLAR
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import AuthGUI from '../../Utils/AuthGUI'

export default function TweetCard(props) {

  const { post, user, singleTweet } = props


    // function
    const create_string = () => {

        if (singleTweet)
            return <Link to={`/`}> <BsArrowLeft color='blue' size={25}></BsArrowLeft> Geri Git </Link>

        else return <Link to={`/tweets/${post._id}`}> <BsArrowRight color='blue' size={25}></BsArrowRight> Gönderiye Git</Link>
    }



  return (

    <div key={post._id} className="col-12 mb-5 tweetModel">

    <div className="d-flex align-items-center card_navigator">

    {create_string()}

    {/* {

      user !== null && user.user_id === post.author._id ? <DeleteTweet tweet = {post}></DeleteTweet> : null
    } */}

     {console.log("GLEEN USER.USER_İD PROPS:", user._id)}
    <AuthGUI tweet = {post} userId={user?._id} label = "delete_tweet"></AuthGUI>

    </div>
  

    <div className='author-container mt-4'>

            <div className='author-avatar'>
                  <img src={`${base_media_url}/${post.author.avatar}`} alt={`${post.author.username}'in fotoğrafı`} />
            </div>

            <div className='author-username'>
               <Link to={`/users/${post.author.username}`}>{post.author.username}</Link>
            </div>


            <div className='post-timespan'>

                  <small className='text-muted'>{post.createdAt}</small>
            </div>
    
    </div>


    <div className='card-body'>

        <div className="user-post">
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

  </div>
  )
}
