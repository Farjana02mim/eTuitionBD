import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const OngoingTuitions = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ['ongoing-tuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?tutorEmail=${user?.email}&status=Approved`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Ongoing Tuitions</h1>
      {tuitions.length === 0 ? (
        <p className="text-gray-500">No ongoing tuitions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Subject</th>
                <th className="px-4 py-2 text-left text-gray-600">Class</th>
                <th className="px-4 py-2 text-left text-gray-600">Student Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Location</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((t) => (
                <tr key={t._id} className="border-b">
                  <td className="px-4 py-2">{t.subject}</td>
                  <td className="px-4 py-2">{t.class}</td>
                  <td className="px-4 py-2">{t.studentName}</td>
                  <td className="px-4 py-2">{t.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default OngoingTuitions
