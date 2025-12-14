import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  return (
    <tr className='hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition'>
      {/* Email */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-700 font-medium'>{user?.email}</p>
      </td>

      {/* Role */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700'>
          {user?.role}
        </span>
      </td>

      {/* Action */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='px-4 py-1.5 rounded-full text-sm font-semibold
          bg-gradient-to-r from-gray-500 to-blue-500
          text-white hover:opacity-90 transition'
        >
          Update Role
        </button>

        {/* Modal */}
        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  )
}

export default UserDataRow
