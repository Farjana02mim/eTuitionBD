import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const TuitionDetails = () => {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()

  const { data: tuition, isLoading } = useQuery({
    queryKey: ['tuition', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  if (!tuition)
    return (
      <div className="text-center py-12 text-gray-500">
        Tuition not found.
      </div>
    )

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-4 text-gray-700">{tuition.subject}</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <p className="text-gray-600">
          <span className="font-semibold">Class:</span> {tuition.class}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> {tuition.location}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Budget:</span> ৳ {tuition.budget}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Schedule:</span> {tuition.schedule}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Description:</span> {tuition.description}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Posted by:</span> {tuition.studentName}
        </p>
        <button className="mt-4 px-6 py-2 rounded-lg text-white bg-gradient-to-r from-gray-400 to-blue-500 hover:from-gray-500 hover:to-blue-600 transition">
          Apply / Contact Tutor
        </button>
      </div>
    </div>
  )
}

export default TuitionDetails
