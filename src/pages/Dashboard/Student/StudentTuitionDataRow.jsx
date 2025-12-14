import { toast } from 'react-hot-toast'
import { FaEdit, FaTrash } from 'react-icons/fa'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const StudentTuitionDataRow = ({ tuition, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tuition?')) {
      try {
        await axiosSecure.delete(`/tuitions/${tuition._id}`)
        toast.success('Tuition deleted successfully')
        refetch()
      } catch (err) {
        console.log(err)
        toast.error('Failed to delete tuition')
      }
    }
  }

  const handleEdit = () => {
    // Redirect to PostTuition.jsx with pre-filled data (optional)
    // For simplicity, we can implement modal or navigate to edit page
    toast('Edit functionality can be implemented here', { icon: '✏️' })
  }

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{tuition.subject}</td>
      <td className="px-4 py-2">{tuition.class}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded text-white ${
            tuition.status === 'Approved'
              ? 'bg-green-500'
              : tuition.status === 'Rejected'
              ? 'bg-red-500'
              : 'bg-yellow-500'
          }`}
        >
          {tuition.status}
        </span>
      </td>
      <td className="px-4 py-2 flex space-x-2">
        <button
          onClick={handleEdit}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:opacity-90"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-90"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default StudentTuitionDataRow
