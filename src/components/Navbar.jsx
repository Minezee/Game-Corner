import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-primary text-secondary py-5'>
      <div className='container flex justify-between items-center font-bold'>
        <Link href={"/"}>
          <Image src={"/assets/logo.svg"} width={75} height={75} alt='logo'/>
        </Link>
        <div className='flex flex-row gap-5'>
          <Link className='px-2 py-2' href={"/booking/ps5"}>Playstation 5</Link>
          <Link className='px-2 py-2' href={"/booking/xbox"}>Xbox</Link>
          <Link className='px-2 py-2' href={"/booking/pc"}>PC</Link>
          <Link className='px-2 py-2' href={"/booking/step"}>Step Revolution</Link>
        </div>
        {/* <div className='flex flex-row gap-3'>
          <Link href={"/login"} className='px-6 py-2 border border-secondary rounded-lg'>Login</Link>
          <Link href={"/login"} className='px-6 py-2 text-primary bg-secondary border border-secondary rounded-lg'>Signup</Link>
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar