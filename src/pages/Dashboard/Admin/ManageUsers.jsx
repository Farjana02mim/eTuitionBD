import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        User Management
      </h2>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <UserDataRow
                key={user._id}
                user={user}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers
