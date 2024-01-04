import React from "react";
import { Modal,Box,Typography, Button, Input } from "@mui/material";


const AuthModal = ({open, onClose, title,setUsername, handleSubmit,setEmail,setPassword,email,password,username}) =>{
    const style = {
        position: 'absolute',
        top:'25%',
        left:'50%',
        transform: 'translate(-50%,50%)',
        width:400,
        bgColor:'background.paper',
        border:'2px solid #000',
        boxShadow:24,
        p:4,

    }
    return (
        <Modal open={open} onClose={onClose} >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant = 'h6' component='h2' display='center' sx= {{color:'lightgrey'}} > 
                    <form className="app__signUp">
                        <center>{title}</center>
                        {username && (
                            <Input placeholder="username" typ="text" value = {username} onChange={(e) =>setEmail(e.target.value)}/>
                        )}
                        <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input placeholder="password" type="password"value={password} onChange={(e) =>setPassword(e.target.value)}/>
                        <Button variant="contaiined" type="submit" size = "small" sx={{border: '1px light gray'}} onClick={handleSubmit}> {title}</Button>
                    </form>
                </Typography>
            </Box>
        </Modal>

    )
}

export default AuthModal