import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import {AuthContext} from './context/Authcontext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './login';
import Register from './register';
import Main from './components/main';








function App() {
    const {auth} = useContext(AuthContext) 
 
    

return(
  <div>

  
    <Routes>
   
      <Route path='/' exact Component={Login}/>
      <Route path='/register' exact Component={Register}/>
      <Route path='/main' exact Component={Main}/>
 
    </Routes>

  </div>
)
}

export default App;