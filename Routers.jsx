//import { StyleSheet, Text, View } from 'react'
import React from 'react'
import '../App.css'
import Home from './Home1'
import About from './About'
import Support from './Support'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function Routers() {
  return (
    <><div className="parent">
      <BrowserRouter>

        <Routes>
          <Route path = "/" element = {<Home />}  />
          <Route path = "/About" element = {<About />}/>
          <Route path = "/Support" element = {<Support />}/>
          {/* <Route path = "*" element = {<pagenotfound/>}></Route> */}
        </Routes>
      </BrowserRouter></div>
    </>
  )
}

export default Routers