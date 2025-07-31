import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='h-20 p-4'>
        <Link href="/" className='text-2xl'>Logo</Link>
    </nav>
  )
}

export default Navbar
