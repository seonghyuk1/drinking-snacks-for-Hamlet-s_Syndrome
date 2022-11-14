import Login from './Pages/Login';
import Main from './Pages/Main'
import Signup from './Pages/Signup'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={ <Login/> } />
      <Route path='signup' element={ <Signup/> } />
      <Route path='Main' element={ <Main/> } />
    </Routes>
    </>
  );
}

export default App;
