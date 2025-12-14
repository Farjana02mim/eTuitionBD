import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { motion } from 'framer-motion'

const TuitionListing = () => {
  const axiosSecure = useAxiosSecure()

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ['all-tuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuitions?status=Approved')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      <h2 className="text-3xl font-semibold text-gray-700 text-center mb-8">All Tuitions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tuitions.map((t) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.subject}</h3>
            <p className="text-gray-500 text-sm mb-1">Class: {t.class}</p>
            <p className="text-gray-500 text-sm mb-1">Location: {t.location}</p>
            <p className="text-gray-500 text-sm mb-2">Budget: ৳ {t.budget}</p>
            <Link
              to={`/tuition/${t._id}`}
              className="inline-block mt-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-gray-400 to-blue-500 hover:from-gray-500 hover:to-blue-600 transition"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TuitionListing
