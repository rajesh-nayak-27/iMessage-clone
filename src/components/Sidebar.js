import { RateReview, Search } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'
import db, { auth } from '../firebase/firebase'
import './Sidebar.css'
import SidebarChat from './SidebarChat'

function Sidebar() {
    const user = useSelector(selectUser)
    const [chats, setchats] = useState([])
    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot => {
            setchats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])

    const addchat = () => {
        const chatname = prompt("please enter a chat name");
        if (chatname) {
            db.collection('chats').add({
                chatname: chatname,
            })
        }
    }
    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <Avatar src={user.photo} onClick={() => auth.signOut()} className='avatar' />
                <div className="search">
                    <Search />
                    <input type="text" placeholder='search' />
                </div>
                <IconButton onClick={addchat} variant="outlined" className='sidebar_inputbutton'>
                    <RateReview className='rateicon' />
                </IconButton>
            </div>
            <div className="sidebar_chat">
                {chats.map(({ id, data: { chatname } }) => (
                    <SidebarChat key={id} id={id} chatname={chatname} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar