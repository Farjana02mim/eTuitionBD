import { useState } from 'react'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const TuitionDataRow = ({ tuition, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async status => {
    try {
      setLoading(true)
      await axiosSecure.patch(`/tuitions/${tuition?._id}`, { status })
      refetch()
      Swal.fire('Success!', `Tuition ${status}`, 'success')
    } catch (err) {
      Swal.fire('Error!', err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <tr className='hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition'>
      {/* Title */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-700 font-medium'>{tuition?.title}</p>
      </td>

      {/* Subject */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-600'>{tuition?.subject}</p>
      </td>

      {/* Student Email */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-600'>{tuition?.studentEmail}</p>
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

      {/* Actions */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <div className='flex gap-2'>
          <button
            disabled={loading}
            onClick={() => handleStatusChange('approved')}
            className='px-3 py-1 rounded-full text-xs font-semibold
            bg-gradient-to-r from-blue-500 to-blue-600 text-white
            hover:opacity-90 disabled:opacity-50'
          >
            Approve
          </button>

          <button
            disabled={loading}
            onClick={() => handleStatusChange('rejected')}
            className='px-3 py-1 rounded-full text-xs font-semibold
            bg-gradient-to-r from-gray-500 to-gray-700 text-white
            hover:opacity-90 disabled:opacity-50'
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TuitionDataRow
