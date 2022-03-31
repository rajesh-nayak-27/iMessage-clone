import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Mic } from '@mui/icons-material';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import { selectchatId, selectchatName } from '../features/chat/chatSlice';
import db from '../firebase/firebase';
import firebase from 'firebase';
import { selectUser } from '../features/user/userSlice';
import FlipMove from 'react-flip-move';

function Chat() {
    const chatName = useSelector(selectchatName);
    const chatId = useSelector(selectchatId);
    const [input, setinput] = useState("");
    const [messages, setmessages] = useState([]);
    const user = useSelector(selectUser)

    useEffect(() => {
        if (chatId) {
            db.collection("chats").doc(chatId).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setmessages(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        })
        setinput("")
    }
    return (
        <div className="chat">
            <div className="chatheader">
                <h4>To: <span className='chat_name'>{chatName}</span></h4>
                <strong>Details</strong>
            </div>
            <div className="chatmessage">
                <FlipMove>
                    {messages.map(({ id, data }) => (
                        <Messages key={id} contents={data} />
                    ))
                    }
                </FlipMove>
            </div>
            <div className="chatinput">
                <form >
                    <input value={input} onChange={(e) => setinput(e.target.value)} type="text" placeholder='iMessage' />
                    <button onClick={sendMessage} type="submit">send message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat