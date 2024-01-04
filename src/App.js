import  React, { useState, useEffect } from 'react';
import './App.css';
import Posts from './components/Posts'
import { db,auth } from './firebase';
import  {Button} from '@mui/material';
import ImageUpload from './components/ImageUpload';
import AuthModal from './AuthModal';





function App() {


  // use State Hook in react

   // three  objects (props we send) they are username and caption
    
  const [posts, setPosts] = useState([]);
  const [open,setOpen] = useState(false);

  const [openSignIn,setOpenSignIn] = useState(false);

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState(null)

  //Any changes hapen in authenticator it will fire 
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser){
    // user has logged in...
    console.log(authUser);
    setUser(authUser);
    
    if(authUser.displayName){
      // dont update username
    }
    } else {

      setUser(null)
      // user has logged out....
    }

  })
  // once if the useEffect fires again perform some cleanup actions before
  // you refire use Effect
  return () => {
    unsubscribe();
  }

  // when we use a variable  we have to pass it 
  }, [user,username]);
  

  // react hook (Use Effect) runs a piece of code based on a specific condition

  useEffect(() => {
    // snapshot- powerful listener every time the database changes
    // indicator (orderBy is used to order the posts)

    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {

      setPosts(snapshot.docs.map((doc)=> ({ 
        id: doc.id,
        post: doc.data(),
      })));
    })

    // run once when the page loads if blank 
    // wont run again 

  }, [])


  

  // Authetication Code using firebase Authentication
  // user is asked to sign up 
  
  const handleSubmitSignUp = (event) =>{
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email,password)
      .then(async (authUser) =>{
        await authUser.user.updateProfile({
          displayName: username,
        })
        setUser(authUser.user)
      })
      .catch((error) => alert(error.message))

      setOpen(false);

  }
  const handleSubmitSignIn = (event) =>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password).catch((error) =>(error.message));
    setOpenSignIn(false)
  }
  const handleLogout = () =>{
    auth.signOut();
  }





  return (
    <div className="App">
      <AuthModal
      open={open}
      onClose={() =>setOpen(false)}
      title="#SlackPosts - Sign Up"
      handleSubmit={handleSubmitSignUp}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      username={username}
      email={email}
      password={password}
      
      />



      {/* ------------------SECOND MODAL---------------------------- */}

      {/* second modal for sign in modal is like a pop up window */}


      <AuthModal
      open={openSignIn}
      onClose={() =>setOpenSignIn(false)}
      title="#Slackposts - Sign In"
      handleSubmit={handleSubmitSignIn}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      password={password}

      />
      
      {/* header where the buttons are present at the top right  */}


      <div className='app__header'>
        <h3># SlackPosts</h3>
        {user ? (
          // Logout button handling the logout authentication of user  

        <Button variant='text'sx={{color:'black',size:'medium'}} onClick={handleLogout}>LogOut</Button>

      ) : (
        <div className='app__loginContainer'>
          <Button variant='text'sx={{color:'black',size:'medium'}} onClick={() => setOpenSignIn(true)}>Sign In</Button>
          
          <Button variant='text' sx={{color:'black',size:'medium'}} onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>
      <div className='app__posts'>
      {
        posts.map(({id,post}) => (
          <Posts key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

      </div>
      {user?.displayName ? (
        <ImageUpload  username={user.displayName}/>
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
