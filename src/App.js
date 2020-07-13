import React from 'react';
import EnterForm from './Components/EnterForm'
import {socket} from './socket'

function App() {

  return (
    <div className="wrapper">     
        <EnterForm />
    </div>

  );
}

export default App;
