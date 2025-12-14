import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import TuitionDataRow from '../../../components/Dashboard/TableRows/TuitionDataRow'

const ManageTuitions = () => {
  const axiosSecure = useAxiosSecure()

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-tuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/tuitions')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Tuition Management
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">Class / Subject</th>
              <th className="px-5 py-3">Budget</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map(tuition => (
              <TuitionDataRow
                key={tuition._id}
                tuition={tuition}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageTuitions
