import React from 'react'
import ModerationTool from '../ModerationTool'
import { base_media_url } from '../../shared';
import { Link } from 'react-router-dom';

export default function CommentCard(props) {

    // post = tweet
    // comment = tweet'e yapılan yorum
    const { user, post, comment } = props;

    // comment_box
    const handleModerationToolBox = (comment) => {
    // eğer user anomimse çalışma
    if (user === null) {
        return;
    }
  
    if (comment.author._id === user.user_id ) {
         return <ModerationTool tweetId = {post._id} commentId = {comment._id}></ModerationTool>
    }
  }

  return (
        
        <>
        <div className='tweetModel mb-4'>

        <div className='author-container mt-4'>

                <div className='author-avatar'>
                    <img src={`${base_media_url}/${comment.author.avatar}`} alt={`${comment.author.username}'in fotoğrafı`} />
                </div>

                <div className='author-username'>
                <Link to={`/users/${comment.author.username}`}>{comment.author.username}</Link>
                </div>


                <div className='post-timespan'>

                    <small className='text-muted'>{comment.createdAt}</small>
                </div>

        </div>


        
        <div className='card-body'>

                <div className="user-post">

                <div className="d-flex align-items-center">
                        
                    <p className='me-auto'>{comment.message}</p>
                    {handleModerationToolBox(comment)}

                </div>


                </div>


       </div>
       
       </div>
        </>
  )
}
