import React from 'react'
import Image from 'next/image'
import { devices } from '@/utils/data/devices'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='container py-14'>
      <div className='w-full flex flex-col items-center'>
        <h1 className='font-micro text-[160px] text-center text-secondary'><span className='text-primary'>GAME</span> CORNER</h1>
        <p className='text-lg text-center max-w-[714px] font-bold text-primary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare cursus sed nunc eget dictum  Sed ornare cursus sed nunc eget dictumd nunc eget dictum  Sed ornare cursus sed nunc eget dictum  </p>
        <Link href={"/booking"} className='font-bold bg-primary text-secondary mt-8 py-2 px-3 rounded-lg'>BOOK NOW!</Link>
      </div>

      <div className='mt-[104px]'>
        <h2 className='font-micro font-bold text-primary text-[64px] text-center'>AVAILABLE DEVICES</h2>
        <div className='grid grid-cols-4 gap-20'>
          {devices.map(device => (
            <Link href={`/booking/${device.slug}`} key={device.id} className='relative'>
              <Image src={device.image} width={282} height={358} alt={device.name} className='rounded-lg'/>
              <span className='absolute bottom-2 left-2 text-white font-bold'>{device.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home