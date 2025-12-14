import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role)
  const axiosSecure = useAxiosSecure()

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch('/update-role', {
        email: user?.email,
        role: updatedRole,
      })
      toast.success('Role updated!')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || 'Error updating role')
    } finally {
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10' onClose={closeModal}>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
            <DialogTitle className='text-lg font-medium text-black'>
              Update User Role
            </DialogTitle>
            <form className='mt-4'>
              <select
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
                className='w-full border border-gray-200 rounded-xl px-2 py-3'
              >
                <option value='customer'>Customer</option>
                <option value='tutor'>Tutor</option>
                <option value='admin'>Admin</option>
              </select>
              <div className='flex justify-around mt-4'>
                <button
                  type='button'
                  onClick={handleRoleUpdate}
                  className='px-4 py-2 bg-green-100 text-green-900 rounded-md hover:bg-green-200'
                >
                  Update
                </button>
                <button
                  type='button'
                  onClick={closeModal}
                  className='px-4 py-2 bg-red-100 text-red-900 rounded-md hover:bg-red-200'
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateUserRoleModal
