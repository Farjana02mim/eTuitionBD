import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const ApplicationRow = ({ application, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleWithdraw = async () => {
    const result = await Swal.fire({
      title: 'Withdraw Application?',
      text: 'You will not be able to apply again for this tuition.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, withdraw',
    })

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/${application?._id}`)
        refetch()
        Swal.fire(
          'Withdrawn!',
          'Your application has been withdrawn.',
          'success'
        )
      } catch (err) {
        Swal.fire('Error!', err.message, 'error')
      }
    }
  }

  return (
    <tr className='hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition'>
      {/* Tuition Title */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='font-medium text-gray-700'>
          {application?.tuitionTitle}
        </p>
      </td>

      {/* Student Email */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-600'>{application?.studentEmail}</p>
      </td>

      {/* Status */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            application?.status === 'accepted'
              ? 'bg-blue-100 text-blue-700'
              : application?.status === 'rejected'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {application?.status || 'pending'}
        </span>
      </td>

      {/* Action */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        {application?.status === 'pending' ? (
          <button
            onClick={handleWithdraw}
            className='px-4 py-1.5 rounded-full text-xs font-semibold
            bg-gradient-to-r from-gray-500 to-blue-500
            text-white hover:opacity-90 transition'
          >
            Withdraw
          </button>
        ) : (
          <span className='text-gray-400 text-xs'>N/A</span>
        )}
      </td>
    </tr>
  )
}

export default ApplicationRow
