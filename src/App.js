import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/MainPages/Home'
import './App.scss'
import axios from 'axios'
import { firebaseConfig } from './Firebase'
import * as firebase from 'firebase/app'
import { getStorage } from 'firebase/storage'
import WatchVideo from './Pages/MainPages/WatchVideo'
import AddVideo from './Pages/MainPages/AddVideo'

axios.defaults.baseURL = 'https://clone-5b8ee-default-rtdb.asia-southeast1.firebasedatabase.app'
const app = firebase.initializeApp(firebaseConfig)
export const storage = getStorage(app);

const App = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/upload" element={<AddVideo />} />
        <Route path="/video/:id" element={<WatchVideo />} />
      </Routes>
    </div>
  )
}

export default App