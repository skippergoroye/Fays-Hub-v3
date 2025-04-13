'use client'

import React from 'react'
import Sidebar from './_components/Sidebar'
import Navbar from './_components/Navbar'

const Layout = ({ children }:{children: React.ReactNode}) => {
  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout