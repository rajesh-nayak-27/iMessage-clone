import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setChat } from '../features/chat/chatSlice';
import db from '../firebase/firebase';
import './SidebarChat.css'
import * as timeago from 'timeago.js';

function Sidebar_chat({ id, chatname }) {
    const dispatch = useDispatch();
    const [chatinfo, setchatinfo] = useState([])

    useEffect(() => {
        db.collection("chats").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setchatinfo(snapshot.docs.map((doc) => doc.data()))
        })

    }, [id])

    return (
        <div onClick={() => {
            dispatch(setChat({
                chatId: id,
                chatName: chatname
            }))
        }} className='SidebarChat'>
            <Avatar />
            <div className="SidebarChat_info">
                <h3>{chatname}</h3>
                <p>{chatinfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatinfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>
    )
}

export default Sidebar_chat