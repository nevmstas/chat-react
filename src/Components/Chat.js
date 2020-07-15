import React, {useRef, useEffect} from 'react'
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

    const messageRef = useRef(null)

    useEffect(()=>{
        messageRef.current.scrollTo(0, 999999)
    }, [messages])
    return (
        <div className = "chat">
            <div className ="chat-users">
                <b>Room: {roomId}:</b>
                <hr/>
                <b>Users ({users.length}):</b>
                <ul>
                    {users.map((user, index) => <li key={user + index}>{user}</li>)}
                </ul>
                
            </div>

            <div className ="chat-messages">
                <div ref = {messageRef}className="messages">
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
