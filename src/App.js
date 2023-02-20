import  React, { useState, useEffect } from 'react';
import './App.css';
import Posts from './components/Posts'
import { db } from './firebase';

function App() {
  // use State Hook in react

  const [posts, setPosts] = useState([

    // three  objects (props we send) they are username and caption
    
  ]);


  // react hook (Use Effect) runs a piece of code based on a specific condition

  useEffect(() => {
    // snapshot- powerful listener every time the database changes

    db.collection('posts').onSnapshot(snapshot => {

      setPosts(snapshot.docs.map(doc=> doc.data()))
    })

    // run once when the page loads if blank 
    // wont run again 

  }, [posts])
  



  return (
    <div className="App">
      <div className='app__header'>
        <h3># SlackPosts</h3>
      </div>

      {
        posts.map(post => (
          <Posts username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;
