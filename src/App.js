import React, {useReducer, useEffect} from 'react';
import EnterForm from './Components/EnterForm'
import Chat from './Components/Chat'
import socket from './socket'

import reducer from './redux/reducer'
import { JOINED } from "./redux/types";


function App() {
  const [state, dispatch] = useReducer(reducer, {
    isJoined: false,
    roomId: null,
    userName: null
  })

  const onLogin = (obj) => {
    dispatch({
      type:JOINED,
      payload:obj
    })
    socket.emit('ROOM:JOIN', obj)
  }

  useEffect(() => {
    socket.on('ROOM:JOINED', (users)=>{
      console.log('new user:', users)
    })
  }, [])
  

  return (
    <div className="wrapper">     
        {!state.isJoined ? <EnterForm onLogin={onLogin}/>: <Chat/>}
    </div>
  );
}

export default App;
