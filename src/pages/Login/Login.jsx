import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { saveOrUpdateUser } from '../../utils'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  // Email & Password Login
  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      const { user } = await signIn(email, password)

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err?.message)
    }
  }

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">
            Login to your eTuitionBd account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="********"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Extra Options */}
        <div className="text-right mt-2">
          <button className="text-xs text-blue-500 hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition"
        >
          <FcGoogle size={26} />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            state={from}
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
