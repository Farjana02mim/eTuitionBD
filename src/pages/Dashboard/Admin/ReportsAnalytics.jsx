import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/reports')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const { transactions = [], monthlyRevenue = [] } = data || {}

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-700">
        Reports & Analytics
      </h1>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Monthly Revenue
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-5 py-3">Transaction ID</th>
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">Tutor</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(tx => (
              <tr key={tx._id} className="border-b">
                <td className="px-5 py-3 text-gray-700">{tx.transactionId}</td>
                <td className="px-5 py-3 text-gray-600">{tx.studentName}</td>
                <td className="px-5 py-3 text-gray-600">{tx.tutorName}</td>
                <td className="px-5 py-3 text-gray-700">৳ {tx.amount}</td>
                <td className="px-5 py-3 text-gray-600">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tx.status === 'Success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportsAnalytics
