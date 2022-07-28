import React from 'react'
import Haeder from './componnets/Haeder'
import Main from './componnets/Main'
import { Route, Routes } from 'react-router-dom'
import InsideFolder from './componnets/InsideFolder'


export default function Layout() {
  return (
    <div>
    <Routes>
    <Route path='/' element={<><Main /></>}></Route>
    <Route path='/insideFolder' element={<InsideFolder/>}></Route>

    </Routes>
    </div>
  )
}
