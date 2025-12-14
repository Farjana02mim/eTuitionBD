import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const Home = () => {
  const axiosSecure = useAxiosSecure()

  // Fetch latest tuition posts
  const { data: tuitions = [], isLoading: tuitionsLoading } = useQuery({
    queryKey: ['latest-tuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuitions?limit=5&status=Approved')
      return res.data
    },
  })

  // Fetch latest tutors
  const { data: tutors = [], isLoading: tutorsLoading } = useQuery({
    queryKey: ['latest-tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors?limit=5')
      return res.data
    },
  })

  if (tuitionsLoading || tutorsLoading) return <LoadingSpinner />

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-400 to-blue-500 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Find the Best Tutors Near You
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl"
        >
          Connect with verified tutors, manage classes, and pay securely online.
        </motion.p>
        <Link
          to="/tuitions"
          className="inline-block mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-100 transition"
        >
          Browse Tuitions
        </Link>
      </section>

      {/* Latest Tuition Posts */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Latest Tuition Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((t) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{t.subject}</h3>
              <p className="text-gray-500 text-sm">Class: {t.class}</p>
              <p className="text-gray-500 text-sm">Location: {t.location}</p>
              <p className="text-gray-500 text-sm">Budget: ৳ {t.budget}</p>
              <Link
                to={`/tuition/${t._id}`}
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Tutors */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Latest Tutors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((t) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">{t.name}</h3>
              <p className="text-gray-500 text-sm text-center">{t.subjects.join(', ')}</p>
              <Link
                to={`/tutor/${t._id}`}
                className="block mt-2 text-center text-blue-600 hover:underline"
              >
                View Profile
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-semibold mb-8 text-gray-700 text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-md shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Post a Tuition</h3>
            <p className="text-gray-500 text-sm">Students post their tuition requirements easily.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Apply / Approve Tutors</h3>
            <p className="text-gray-500 text-sm">
              Tutors apply, and students approve the best match.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Start Learning</h3>
            <p className="text-gray-500 text-sm">
              Classes begin with clear schedule and payments.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8 text-gray-700 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-400 to-blue-500 text-white p-6 rounded-md shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Verified Tutors</h3>
            <p>All tutors are verified for quality and safety.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-400 to-blue-500 text-white p-6 rounded-md shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p>Payments are secure and transparent with receipts.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-400 to-blue-500 text-white p-6 rounded-md shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Easy Communication</h3>
            <p>Students and tutors can communicate seamlessly.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
