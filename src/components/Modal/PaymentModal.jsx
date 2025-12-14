import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'

const PaymentModal = ({ closeModal, isOpen, tuition }) => {
  const { user } = useAuth()
  const { _id, title, category, price, description } = tuition || {}

  const handlePayment = async () => {
    const paymentInfo = {
      tuitionId: _id,
      title,
      category,
      price,
      description,
      student: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      )
      window.location.href = data.url
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10' onClose={closeModal}>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md bg-white p-6 rounded-2xl shadow-xl'>
            <DialogTitle className='text-lg font-medium text-center text-gray-900'>
              Review Tuition Before Payment
            </DialogTitle>

            <div className='mt-2 text-sm text-gray-500'>
              <p>Title: {title}</p>
              <p>Category: {category}</p>
              <p>Student: {user?.displayName}</p>
              <p>Price: $ {price}</p>
            </div>

            <div className='flex justify-around mt-4'>
              <button
                onClick={handlePayment}
                className='px-4 py-2 bg-green-100 text-green-900 rounded-md hover:bg-green-200'
              >
                Pay
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

export default PaymentModal
