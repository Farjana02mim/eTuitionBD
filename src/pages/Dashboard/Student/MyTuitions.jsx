import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import StudentTuitionDataRow from './StudentTuitionDataRow'

const MyTuitions = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: tuitions = [], isLoading, refetch } = useQuery({
    queryKey: ['my-tuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?studentEmail=${user?.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">My Tuitions</h1>
      {tuitions.length === 0 ? (
        <p className="text-gray-500">No tuition posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Subject</th>
                <th className="px-4 py-2 text-left text-gray-600">Class</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((tuition) => (
                <StudentTuitionDataRow key={tuition._id} tuition={tuition} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyTuitions
