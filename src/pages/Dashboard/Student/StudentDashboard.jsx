import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const StudentDashboard = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data, isLoading } = useQuery({
    queryKey: ['student-dashboard', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students/${user?.email}/dashboard`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const { totalTuitions = 0, pendingTuitions = 0, totalPayments = 0 } = data || {}

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-700">Student Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Tuitions */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Total Tuitions</h2>
          <p className="mt-4 text-3xl font-bold text-gray-800">{totalTuitions}</p>
        </div>

        {/* Pending Tuitions */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Pending Tuitions</h2>
          <p className="mt-4 text-3xl font-bold text-yellow-600">{pendingTuitions}</p>
        </div>

        {/* Total Payments */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Total Payments</h2>
          <p className="mt-4 text-3xl font-bold text-green-600">৳ {totalPayments}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
