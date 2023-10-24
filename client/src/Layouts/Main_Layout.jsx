import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Main_Layout() {
  return (

    <div className='container mt-5'>

    <div className="row">


        <div className="col-2 left-side-bar">

            <li>Dashboard</li>
            <li>Trend</li>
            <li>Profilim</li>
            <li>Bildirim</li>

        </div>


        <div className="col-10 right-feed">

            <Outlet></Outlet>
        
        </div>

        </div>
        
    </div>

  )
}
