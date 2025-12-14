import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const BecomeTutorModal = ({ closeModal, isOpen }) => {
  const axiosSecure = useAxiosSecure()

  const handleRequest = async () => {
    try {
      await axiosSecure.post('/become-tutor') // Updated endpoint
      toast.success('Request sent! Please wait for admin approval.')
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || 'Something went wrong!')
    } finally {
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10' onClose={closeModal}>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md bg-white p-6 rounded-2xl shadow-xl'>
            <DialogTitle className='text-lg font-medium text-center text-gray-900'>
              Become a Tutor
            </DialogTitle>
            <p className='text-sm text-gray-500 mt-2 text-center'>
              Please read all the terms before submitting your tutor request.
            </p>
            <hr className='my-4' />
            <div className='flex justify-around mt-4'>
              <button
                onClick={handleRequest}
                className='px-4 py-2 bg-green-100 text-green-900 rounded-md hover:bg-green-200'
              >
                Continue
              </button>
              <button
                onClick={closeModal}
                className='px-4 py-2 bg-red-100 text-red-900 rounded-md hover:bg-red-200'
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default BecomeTutorModal
