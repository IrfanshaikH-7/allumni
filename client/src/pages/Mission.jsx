import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom'

const Mission = () => {
  return (
    <>
    <Header/>
    <Navbar/>

    <div className='text-2xl w-full text-center bg-gray-300 h-16 relative '>
      <p className='absolute md:left-[10%] m-4'>MISSION</p>
    </div>
    <div className='md:w-[70%] m-10'>
      <ul className='font-semibold'>
        <li className='mb-3'>►To provide value based broad Engineering, Technology and Science where education in students are urged to develop their professional skills.
        </li><hr />
        <li className='mb-3'>►To inculcate dedication, hard work, sincerity, integrity and ethics in building up overall professional personality of our student and faculty.
        </li><hr />
        <li className='mb-3'>►To inculcate a spirit of entrepreneurship and innovation in passing out students.
        </li><hr />
        <li className='mb-3'>►To instill sensitivity amongst the youth towards the community and environment.
        </li><hr />
        <li className='mb-3'>►To instigate sponsored research and provide consultancy services in technical, educational and industrial areas.
        </li><hr />
      </ul>
    </div>
    <div className='text-center mt-16'>

    <NavLink to="/" className='p-3
     border-2 rounded-xl w-[5%] bg-blue-800 text-white'>Home</NavLink>
    </div>
    </>
  )
}

export default Mission