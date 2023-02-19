import React from 'react'
import  './Posts.css';



const Posts = () => {
  return (
    <div className='post'>
        <h3>UserName</h3>
        <img className='post__image' src='https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80://images.unsplash.com/photo-1676761998154-1153d04d82da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' alt='' />
    
      {/* header -> avatar + userName */}

      {/* image */}
      <h4 className='post__text'><strong>MrinalSingha</strong>: wow day 1 on building the website</h4>

      {/* UserName + Caption */}
    </div>
  )
}

export default Posts
