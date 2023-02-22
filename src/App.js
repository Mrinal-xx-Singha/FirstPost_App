import  React, { useState, useEffect } from 'react';
import './App.css';
import Posts from './components/Posts'
import { db,auth } from './firebase';
import { Modal,Box,Typography, Button,Input } from '@mui/material';
import ImageUpload from './components/ImageUpload';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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
  


  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then(async (authUser) => {
      const authUser_1 = await authUser.user.updateProfile({
        displayName: username
      });
      setUser(authUser_1);
    })
    .catch((error) => alert(error.message))

    setOpen(false);
  }


  const signIn = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="App">


      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      
      >
        {/* signUp Modal Code */}
        
        <Box sx={style}>
          <Typography id="modal-modal-title" 
          variant="h6"
           component="h2"
           display='center'
           sx={{color:'lightgrey'}}
           >
            <form className='app__signUp'>
            <center>#SlackPosts</center>

            {/* form to get the user name of the user */}

            <Input placeholder='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            {/* form to get the email of the user  */}

            <Input placeholder='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            {/* form to get the password fo the user */}

            <Input placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {/*  */}

            <Button variant='contained' 
            type='submit'
            size='small'
             sx={{border:'1px light gray'}} onClick={signUp}>Sign Up</Button>
            </form>
          </Typography>
          
        </Box>
      </Modal>

      {/* ------------------SECOND MODAL---------------------------- */}

      {/* second modal for sign in modal is like a pop up window */}


      <Modal
        open={openSignIn}
        onClose={()=>setOpen(false)}
      
      >
        {/* signUp Modal Code */}
        
        <Box sx={style}>
          <Typography id="modal-modal-title" 
          variant="h6"
           component="h2"
           display='center'
           sx={{color:'lightgrey'}}
           >
            <form className='app__signUp'>
            <center>#SlackPosts</center>
            
            <Input placeholder='email'
            
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant='contained' 
            type='submit'
            size='small'
             sx={{border:'1px light gray'}} onClick={signIn}>Sign In</Button>
            </form>
          </Typography>
          
        </Box>
      </Modal>
      
      {/* header where the buttons are present at the top right  */}


      <div className='app__header'>
        <h3># SlackPosts</h3>
        {user ? (
          // Logout button handling the logout authentication of user  

        <Button variant='text'sx={{color:'black',size:'medium'}} onClick={() => auth.signOut()}>LogOut</Button>

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
