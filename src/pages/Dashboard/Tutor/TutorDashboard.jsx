import useAuth from '../../../hooks/useAuth'

const TutorDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Welcome, {user?.displayName}</h1>
      <p className="text-gray-500 mb-6">
        This is your Tutor Dashboard. You can track your applications, ongoing tuitions, and revenue.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-gray-400 to-blue-500 p-4 rounded-md text-white">
          <h2 className="text-xl font-semibold">My Applications</h2>
          <p className="mt-2">Track all your tuition applications.</p>
        </div>
        <div className="bg-gradient-to-r from-gray-400 to-blue-500 p-4 rounded-md text-white">
          <h2 className="text-xl font-semibold">Ongoing Tuitions</h2>
          <p className="mt-2">View all tuitions approved by students.</p>
        </div>
        <div className="bg-gradient-to-r from-gray-400 to-blue-500 p-4 rounded-md text-white">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="mt-2">Check your earnings and transaction history.</p>
        </div>
      </div>
    </div>
  )
}

export default TutorDashboard
