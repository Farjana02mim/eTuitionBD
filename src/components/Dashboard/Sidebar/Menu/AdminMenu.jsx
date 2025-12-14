import { FaUserCog, FaUserTag } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <div className="flex flex-col gap-1">
      <MenuItem
        icon={FaUserCog}
        label='Manage Users'
        address='manage-users'
        className='hover:bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 rounded-md transition'
      />
      <MenuItem
        icon={FaUserTag}
        label='Seller Requests'
        address='seller-requests'
        className='hover:bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 rounded-md transition'
      />
    </div>
  )
}

export default AdminMenu
