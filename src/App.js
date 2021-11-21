import React, {Suspense} from 'react'

import './App.css';
import MiniDrawer from './Template/template'

import 'firebase/firestore'

import { CircularProgress } from '@material-ui/core';



function App() {
  return (
      <div className="App">
        <MiniDrawer/>
      </div>
  );
}

export default App;
