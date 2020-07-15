import React from 'react'
import MessageForm from './MessageForm'
export default function Chat() {
    return (
        <div className = "chat">
            <div className ="chat-users">
                <b>Users (1):</b>
                <ul>
                    <li>Kek User</li>
                </ul>
                
            </div>

            <div className ="chat-messages">
                <div className="messages">
                    <div className="message">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <div>
                            <span>Kek User</span>
                        </div>
                    </div>
                    <div className="message">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <div>
                            <span>Kek User</span>
                        </div>
                    </div>
                </div>
                <MessageForm />

            </div>
        </div>
    )
}
