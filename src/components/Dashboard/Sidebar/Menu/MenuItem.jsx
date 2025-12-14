/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 rounded-lg transition-all duration-300 transform
        ${
          isActive
            ? 'bg-gradient-to-r from-gray-300 to-blue-300 text-gray-900 font-semibold'
            : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-100 hover:text-gray-900'
        }`
      }
    >
      <Icon className='w-5 h-5' />
      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem
