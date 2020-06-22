import React, { useContext } from 'react';
import './global.scss';

import Header from './Header';
import Routes from './routes';

import { StateProvider } from "./store";


function App() {

  return (
    <StateProvider>
      <Header />
      <Routes />
    </StateProvider>
  );
} 

export default App;
