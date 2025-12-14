
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const TuitionDataRow = ({ tuition, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleApprove = async () => {
    const result = await Swal.fire({
      title: 'Approve this tuition?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
    })

    if (result.isConfirmed) {
      await axiosSecure.patch(`/admin/tuitions/${tuition._id}`, {
        status: 'Approved',
      })
      refetch()
      Swal.fire('Approved!', 'Tuition has been approved.', 'success')
    }
  }

  const handleReject = async () => {
    const result = await Swal.fire({
      title: 'Reject this tuition?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
    })

    if (result.isConfirmed) {
      await axiosSecure.patch(`/admin/tuitions/${tuition._id}`, {
        status: 'Rejected',
      })
      refetch()
      Swal.fire('Rejected!', 'Tuition has been rejected.', 'success')
    }
  }

  return (
    <tr className="border-b">
      <td className="px-5 py-3 font-medium text-gray-700">{tuition.title}</td>
      <td className="px-5 py-3 text-gray-600">{tuition.studentName}</td>
      <td className="px-5 py-3 text-gray-600">
        {tuition.class} / {tuition.subject}
      </td>
      <td className="px-5 py-3 text-gray-700">৳ {tuition.budget}</td>
      <td className="px-5 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            tuition.status === 'Approved'
              ? 'bg-green-100 text-green-700'
              : tuition.status === 'Rejected'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {tuition.status || 'Pending'}
        </span>
      </td>
      <td className="px-5 py-3 text-center space-x-2">
        {tuition.status === 'Pending' && (
          <>
            <button
              onClick={handleApprove}
              className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  )
}

export default TuitionDataRow
