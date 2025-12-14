import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

// Pages
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import ErrorPage from '../pages/ErrorPage'
import TuitionListing from '../pages/Tuitions/TuitionListing'
import TuitionDetails from '../pages/Tuitions/TuitionDetails'
import TutorListing from '../pages/Tutors/TutorListing'
import TutorProfile from '../pages/Tutors/TutorProfile'

// Dashboard Pages
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import StudentDashboard from '../pages/Dashboard/Student/StudentDashboard'
import MyTuitions from '../pages/Dashboard/Student/MyTuitions'
import TutorDashboard from '../pages/Dashboard/Tutor/TutorDashboard'
import MyApplications from '../pages/Dashboard/Tutor/MyApplications'
import ProfileSettings from '../pages/Dashboard/ProfileSettings'

import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import TutorRoute from './TutorRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/tuitions', element: <TuitionListing /> },
      { path: '/tuitions/:id', element: <TuitionDetails /> },
      { path: '/tutors', element: <TutorListing /> },
      { path: '/tutors/:id', element: <TutorProfile /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="profile" /> },

      // Admin
      { path: 'admin', element: <AdminRoute><AdminDashboard /></AdminRoute> },
      { path: 'manage-users', element: <AdminRoute><ManageUsers /></AdminRoute> },

      // Student
      { path: 'student', element: <StudentDashboard /> },
      { path: 'my-tuitions', element: <MyTuitions /> },

      // Tutor
      { path: 'tutor', element: <TutorRoute><TutorDashboard /></TutorRoute> },
      { path: 'my-applications', element: <TutorRoute><MyApplications /></TutorRoute> },

      // Profile for all roles
      { path: 'profile', element: <ProfileSettings /> },
    ],
  },
])
