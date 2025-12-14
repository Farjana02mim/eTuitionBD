import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const MyTuitionRow = ({ tuition, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This tuition request will be cancelled',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it',
    })

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/tuitions/${tuition?._id}`)
        refetch()
        Swal.fire('Cancelled!', 'Your tuition has been cancelled.', 'success')
      } catch (err) {
        Swal.fire('Error!', err.message, 'error')
      }
    }
  }

  return (
    <tr className='hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition'>
      {/* Title */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='font-medium text-gray-700'>{tuition?.title}</p>
      </td>

      {/* Subject */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-600'>{tuition?.subject}</p>
      </td>

      {/* Tutor */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-600'>
          {tuition?.tutorEmail || 'Not Assigned'}
        </p>
      </td>

      {/* Status */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            tuition?.status === 'approved'
              ? 'bg-blue-100 text-blue-700'
              : tuition?.status === 'rejected'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {tuition?.status || 'pending'}
        </span>
      </td>

      {/* Action */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        {tuition?.status === 'pending' ? (
          <button
            onClick={handleCancel}
            className='px-4 py-1.5 rounded-full text-xs font-semibold
            bg-gradient-to-r from-gray-500 to-blue-500
            text-white hover:opacity-90 transition'
          >
            Cancel
          </button>
        ) : (
          <span className='text-gray-400 text-xs'>N/A</span>
        )}
      </td>
    </tr>
  )
}

export default MyTuitionRow
