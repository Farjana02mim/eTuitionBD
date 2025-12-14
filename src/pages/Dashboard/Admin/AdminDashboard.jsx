import { useQuery } from '@tanstack/react-query'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const COLORS = ['#2563eb', '#60a5fa', '#93c5fd']

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const {
    totalUsers,
    totalStudents,
    totalTutors,
    totalTuitions,
    totalEarnings,
    monthlyRevenue,
  } = data || {}

  const pieData = [
    { name: 'Students', value: totalStudents },
    { name: 'Tutors', value: totalTutors },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-700">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={totalUsers} />
        <StatCard title="Students" value={totalStudents} />
        <StatCard title="Tutors" value={totalTutors} />
        <StatCard title="Tuitions" value={totalTuitions} />
        <StatCard title="Earnings" value={`৳ ${totalEarnings}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            User Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

/* Small reusable stat card */
const StatCard = ({ title, value }) => (
  <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-lg p-5 shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold text-gray-700 mt-2">
      {value}
    </h2>
  </div>
)

export default AdminDashboard
