import React from 'react'
import MessageForm from './MessageForm'
import socket from '../socket'
export default function Chat({ users, messages, userName, roomId, onAddMessage }) {

    const onSendMessage = (messageValue) =>{
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue
        })
        onAddMessage({userName, text: messageValue})
    }
    return (
        <div className = "chat">
            <div className ="chat-users">
                <b>Users ({users.length}):</b>
                <ul>
                    {users.map((user, index) => <li key={user + index}>{user}</li>)}
                </ul>
                
            </div>

            <div className ="chat-messages">
                <div className="messages">
                    { messages.map((message) =>
                            <div className="message">
                                <p>{message.text}</p>
                                <div>
                                    <span>{message.userName}</span>
                                </div>
                            </div>
                        ) }
                </div>
                <MessageForm onSendMessage = {onSendMessage}/>

            </div>
        </div>
    )
}
