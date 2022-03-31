import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from './Chat'
import './IMessage.css'

function IMessage() {
    return (
        <div className='IMessage'>
            <Sidebar />
            <Chat />
        </div>
    )
}

export default IMessage