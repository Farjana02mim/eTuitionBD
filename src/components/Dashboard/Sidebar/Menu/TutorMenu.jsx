import { MdOutlineWork, MdOutlineSchool } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import MenuItem from './MenuItem'

const TutorMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineSchool}
        label='Tutor Dashboard'
        address='tutor-dashboard'
      />

      <MenuItem
        icon={FaClipboardList}
        label='My Applications'
        address='my-applications'
      />

      <MenuItem
        icon={MdOutlineWork}
        label='Ongoing Tuitions'
        address='ongoing-tuitions'
      />
    </>
  )
}

export default TutorMenu
