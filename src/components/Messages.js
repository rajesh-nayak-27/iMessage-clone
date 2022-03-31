import { Avatar } from '@mui/material'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'
import './Messages.css'

const Messages = forwardRef(({ id, contents: {
    timestamp, displayName, email, message, photo, uid
} }, ref) => {
    const user = useSelector(selectUser)
    return (
        <div ref={ref} div className={`messages ${user.email === email && "message__sender"}`} >
            <Avatar className='message__photo' src={photo} />
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div >
    )
})

export default Messages