import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary w-full h-[361px] pt-12 text-secondary'>
      <div className='container flex items-end justify-between'>
        <div>
          <h3 className='text-2xl font-bold'>Game Corner</h3>
          <p className='max-w-[420px] mt-5 text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare cursus sed nunc eget dictum  Sed ornare cursus sed nunc eget dictumd nunc eget dictum  Sed ornare cursus sed nunc eget dictum  </p>
        </div>
        <div className='flex flex-col gap-12 pr-20 font-bold'>
          <Link href={"/"}>Perangkat</Link>
          <Link href={"/"}>Booking</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer