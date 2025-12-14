import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const Payments = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['student-payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?studentEmail=${user?.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Payment History</h1>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Tuition</th>
                <th className="px-4 py-2 text-left text-gray-600">Tutor</th>
                <th className="px-4 py-2 text-left text-gray-600">Amount (৳)</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{payment.tuitionSubject}</td>
                  <td className="px-4 py-2">{payment.tutorName}</td>
                  <td className="px-4 py-2">৳ {payment.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        payment.status === 'Completed'
                          ? 'bg-green-500'
                          : payment.status === 'Pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Payments
