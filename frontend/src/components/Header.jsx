import React from 'react'
import Navbar from './Navbar'
import TopBar from './TopBar'

const Header = () => {
  return (
    <header className='border-b border-gray-400'>
      {/* <Navbar/> */}
      <TopBar/>
    </header>
  )
}

export default Header