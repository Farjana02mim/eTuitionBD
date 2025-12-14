import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const TutorProfile = () => {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()

  const { data: tutor, isLoading } = useQuery({
    queryKey: ['tutor', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${id}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  if (!tutor)
    return (
      <div className="text-center py-12 text-gray-500">
        Tutor not found.
      </div>
    )

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto space-y-4">
        <div className="flex flex-col items-center">
          <img
            src={tutor.image}
            alt={tutor.name}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-700">{tutor.name}</h2>
          <p className="text-gray-500">{tutor.qualification}</p>
          <p className="text-gray-500">Experience: {tutor.experience} yrs</p>
          <p className="text-gray-500">Expected Salary: ৳ {tutor.salary}</p>
        </div>
        <div className="mt-6 space-y-2">
          <h3 className="text-gray-700 font-semibold">About Me:</h3>
          <p className="text-gray-600">{tutor.bio}</p>
        </div>
        <button className="mt-4 px-6 py-2 rounded-lg text-white bg-gradient-to-r from-gray-400 to-blue-500 hover:from-gray-500 hover:to-blue-600 transition w-full">
          Apply / Contact
        </button>
      </div>
    </div>
  )
}

export default TutorProfile
