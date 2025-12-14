import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/Dashboard/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const TutorRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'tutor') return children

  return <Navigate to='/' replace />
}

export default TutorRoute
