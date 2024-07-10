import { useEffect, useState } from 'react'
import './App.css'
import Home from './component/Home/Home'
import Header from './component/Header/Header'
import CommentPicker from './component/CommentPicker/CommentPicker'

function App() {
  

  return (
    <>
    <Header/>
      <Home/>
      {/* <CommentPicker/> */}
    </>
  )
}

export default App
