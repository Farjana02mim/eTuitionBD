import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyApplications = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['tutor-applications', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?tutorEmail=${user?.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">My Applications</h1>
      {applications.length === 0 ? (
        <p className="text-gray-500">You have not applied to any tuitions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Tuition Subject</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Expected Salary</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b">
                  <td className="px-4 py-2">{app.subject}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        app.status === 'Approved'
                          ? 'bg-green-500'
                          : app.status === 'Rejected'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">৳ {app.expectedSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyApplications
