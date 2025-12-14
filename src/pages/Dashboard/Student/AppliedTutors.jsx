import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { toast } from 'react-hot-toast'

const AppliedTutors = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  // Fetch all tutor applications for the student's tuitions
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['applied-tutors', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?studentEmail=${user?.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const handleApprove = async (appId) => {
    try {
      // Optionally, redirect to payment page
      await axiosSecure.patch(`/applications/${appId}/approve`)
      toast.success('Tutor approved! Proceed to payment.')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error('Failed to approve tutor')
    }
  }

  const handleReject = async (appId) => {
    try {
      await axiosSecure.patch(`/applications/${appId}/reject`)
      toast.success('Tutor rejected')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error('Failed to reject tutor')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Applied Tutors</h1>
      {applications.length === 0 ? (
        <p className="text-gray-500">No tutor applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Tutor Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Qualifications</th>
                <th className="px-4 py-2 text-left text-gray-600">Experience</th>
                <th className="px-4 py-2 text-left text-gray-600">Expected Salary</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b">
                  <td className="px-4 py-2">{app.tutorName}</td>
                  <td className="px-4 py-2">{app.qualifications}</td>
                  <td className="px-4 py-2">{app.experience}</td>
                  <td className="px-4 py-2">৳ {app.expectedSalary}</td>
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
                  <td className="px-4 py-2 flex space-x-2">
                    {app.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(app._id)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:opacity-90"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-90"
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default AppliedTutors
