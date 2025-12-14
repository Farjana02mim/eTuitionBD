import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { imageUpload, saveOrUpdateUser } from '../../utils'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // Email/Password Register
  const onSubmit = async data => {
    const { name, email, password, role, image, phone } = data
    const imageFile = image[0]

    try {
      const imageURL = await imageUpload(imageFile)

      // 1. Create Firebase user
      const result = await createUser(email, password)

      // 2. Update Firebase profile
      await updateUserProfile(name, imageURL)

      // 3. Save user to database with role
      await saveOrUpdateUser({
        name,
        email,
        image: imageURL,
        role,          // ✅ IMPORTANT
        phone,
      })

      toast.success('Signup Successful')
      navigate(from, { replace: true })
      console.log(result)
    } catch (err) {
      toast.error(err?.message)
    }
  }

  // Google SignUp (Default role = Student)
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'student', // ✅ Default role
      })

      toast.success('Signup Successful')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err?.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Join eTuitionBd as Student or Tutor
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-600">Register As</label>
            <select
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              {...register('role', { required: 'Role is required' })}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
            {errors.role && (
              <p className="text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              {...register('phone', { required: 'Phone is required' })}
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-gray-600">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm border rounded-md bg-gray-50 p-2"
              {...register('image', { required: 'Image is required' })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email',
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border rounded-md py-2 hover:bg-gray-50"
        >
          <FcGoogle size={24} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
