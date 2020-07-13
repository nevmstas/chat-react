import React, {useReducer} from 'react';
import EnterForm from './Components/EnterForm'
import {socket} from './socket'

import reducer from './redux/reducer'
import { IS_AUTHENTICATED } from "./redux/types";


function App() {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false
  })

  const onLogin = () => {
    dispatch({
      type:IS_AUTHENTICATED,
      payload:true
    })
  }

  return (
    <div className="wrapper">     
        {!state.isAuth && <EnterForm onLogin={onLogin}/>}
    </div>
  );
}

export default App;
