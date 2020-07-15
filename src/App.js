import React, {useReducer, useEffect} from 'react';
import EnterForm from './Components/EnterForm'
import Chat from './Components/Chat'
import socket from './socket'

import axios from 'axios'

import reducer from './redux/reducer'
import { JOINED, SET_MESSAGES, NEW_MESSAGES, SET_USERS } from "./redux/types";


function App() {
  const [state, dispatch] = useReducer(reducer, {
    isJoined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  })
  const addMessage =(message)=>{
    dispatch({
      type: NEW_MESSAGES,
      payload: message
    })
  }
  const onLogin = async (obj) => {
    dispatch({
      type:JOINED,
      payload:obj
    })
    socket.emit('ROOM:JOIN', obj)
    const { data } = await axios.get(`/rooms/${obj.roomId}`)
    setUsers(data.users)
  }
  const setUsers = (users)=>{
    dispatch({
      type: SET_USERS,
      payload: users
    })
  }
  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers)
    socket.on('ROOM:NEW_MESSAGE', addMessage)
  }, [])
  

  return (
    <div className="wrapper">     
        {!state.isJoined ? <EnterForm onLogin={onLogin}/>: <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
