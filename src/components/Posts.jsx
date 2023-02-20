import React from 'react'
import  './Posts.css';
import { Avatar } from '@mui/material';



// props and destructure

const Posts = ({ username,caption,imageUrl }) => {
  return (
    <div className='post'>
      <div className='post__header'>
      <Avatar
      className='post_avatar'
      alt='username'
      src="/static/images/avatar/1.jpg"/>
        <h3>{username}</h3>
      </div>


        <img className='post__image' src={imageUrl} alt='' />
    
      {/* header -> avatar + userName */}

      {/* image */}
      <h4 className='post__text'><strong>{ username }</strong>{ caption }</h4>

      {/* UserName + Caption */}
    </div>
  )
}

export default Posts
