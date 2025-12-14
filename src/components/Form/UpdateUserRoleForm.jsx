import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UpdateUserRoleForm = ({ user, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const updateRole = async role => {
    await axiosSecure.patch(`/users/role/${user._id}`, { role })
    toast.success('Role updated')
    refetch()
    closeModal()
  }

  return (
    <div className='space-y-3'>
      <button onClick={() => updateRole('admin')} className='btn-primary w-full'>
        Make Admin
      </button>
      <button onClick={() => updateRole('tutor')} className='btn-primary w-full'>
        Make Tutor
      </button>
      <button onClick={() => updateRole('student')} className='btn-primary w-full'>
        Make Student
      </button>
    </div>
  )
}

export default UpdateUserRoleForm
