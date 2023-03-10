import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/login';
import { Store } from './Store';

const App = () => {
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const {userInfo}=state;

  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar/>
      <Routes>
        {userInfo && <Route path='/' element={<Home/>}/>}
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </Container>
    <footer>
        <p>&copy;2023, All Rights Reserved. Powered by Prakash</p>
    </footer>
    </BrowserRouter>
  );
};

export default App;
