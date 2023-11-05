import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { sidebar_routes } from './LoadData'

export default function Main_Layout() {
  return (

    <div className='container mt-5'>

    <div className="row">


        <div className="col-2 left-side-bar">

            <ul className='side-bar-links'>

        
            {sidebar_routes.map((page, index) => {

                return <li key={index}> <Link to={page.href}>{page.label}</Link> </li>
            })}
            
            </ul>
        </div>


        <div className="col-10 right-feed">

            <Outlet></Outlet>
        
        </div>

        </div>
        
    </div>

  )
}
