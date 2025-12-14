import { BsFingerprint } from 'react-icons/bs'
import MenuItem from './MenuItem'

const StudentMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Tuitions'
        address='my-tuitions'
        className='hover:bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 rounded-md transition'
      />
      <MenuItem
        icon={BsFingerprint}
        label='Payments'
        address='payments'
        className='hover:bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 rounded-md transition'
      />
    </>
  )
}

export default StudentMenu
