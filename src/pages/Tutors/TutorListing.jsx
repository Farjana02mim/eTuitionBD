import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { motion } from 'framer-motion'

const TutorListing = () => {
  const axiosSecure = useAxiosSecure()

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ['all-tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      <h2 className="text-3xl font-semibold text-gray-700 text-center mb-8">All Tutors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <motion.div
            key={tutor._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">{tutor.name}</h3>
            <p className="text-gray-500 text-sm text-center mb-2">{tutor.qualification}</p>
            <p className="text-gray-500 text-sm text-center mb-2">Experience: {tutor.experience} yrs</p>
            <p className="text-gray-500 text-sm text-center mb-2">Expected Salary: ৳ {tutor.salary}</p>
            <Link
              to={`/tutor/${tutor._id}`}
              className="block mt-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-gray-400 to-blue-500 hover:from-gray-500 hover:to-blue-600 text-center transition"
            >
              View Profile
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TutorListing
