import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='h-14 p-2 flex items-center justify-center bg-poke-red shadow-[0_4px_50px_#EF5350]'>
      <Link href="/">
        <a>
          <h1 style={{color:"yellow", fontSize:25}}>Pokemon Showcase</h1>
        </a>
      </Link>
    </div>
  )
}

export default Navbar