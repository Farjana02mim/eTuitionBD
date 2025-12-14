import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/logo-flat.png'

// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'

// Menus
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import TutorMenu from './Menu/TutorMenu'
import StudentMenu from './Menu/StudentMenu'

import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isRoleLoading] = useRole()

  // Toggle sidebar (mobile)
  const handleToggle = () => {
    setActive(!isActive)
  }

  if (isRoleLoading) return <LoadingSpinner />

  return (
    <>
      {/* Mobile Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div className='p-4'>
          <Link to='/'>
            <img src={logo} alt='logo' width='100' />
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className='p-4 focus:outline-none'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between bg-gray-100 w-64 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? '-translate-x-full' : ''
        } md:translate-x-0 transition duration-200`}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='hidden md:flex justify-center py-4 bg-lime-100 rounded-lg shadow'>
            <Link to='/'>
              <img src={logo} alt='logo' width='100' />
            </Link>
          </div>

          {/* Menu */}
          <nav className='mt-6 flex-1'>
            {/* Common */}
            <MenuItem
              icon={BsGraphUp}
              label='Dashboard'
              address='/dashboard'
            />

            {/* Role Based */}
            {role === 'admin' && <AdminMenu />}
            {role === 'student' && <StudentMenu />}
            {role === 'tutor' && <TutorMenu />}
          </nav>

          {/* Bottom */}
          <div>
            <hr />

            <MenuItem
              icon={FcSettings}
              label='Profile'
              address='/dashboard/profile'
            />

            <button
              onClick={logOut}
              className='flex w-full items-center px-4 py-2 mt-4 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition'
            >
              <GrLogout className='w-5 h-5' />
              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
