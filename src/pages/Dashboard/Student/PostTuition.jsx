import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const PostTuition = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  if (loading) return <LoadingSpinner />

  const onSubmit = async (data) => {
    try {
      const tuitionData = {
        ...data,
        studentEmail: user?.email,
        studentName: user?.displayName,
        status: 'Pending', // default status for admin approval
      }

      await axiosSecure.post('/tuitions', tuitionData)
      toast.success('Tuition posted successfully!')
      reset()
      navigate('/dashboard/student/my-tuitions')
    } catch (err) {
      console.log(err)
      toast.error('Failed to post tuition')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Post New Tuition</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-600">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
            {...register('subject', { required: 'Subject is required' })}
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Class / Grade</label>
          <input
            type="text"
            placeholder="Class / Grade"
            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
            {...register('class', { required: 'Class is required' })}
          />
          {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Location</label>
          <input
            type="text"
            placeholder="Location"
            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Budget (৳)</label>
          <input
            type="number"
            placeholder="Budget"
            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
            {...register('budget', { required: 'Budget is required' })}
          />
          {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Schedule / Time</label>
          <input
            type="text"
            placeholder="e.g., Mon/Wed/Fri 5-6 PM"
            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
            {...register('schedule', { required: 'Schedule is required' })}
          />
          {errors.schedule && <p className="text-red-500 text-xs mt-1">{errors.schedule.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Additional Notes</label>
          <textarea
            placeholder="Optional notes..."
            className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
            {...register('notes')}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-gradient-to-r from-gray-400 to-blue-500 text-white font-semibold hover:opacity-90"
        >
          Post Tuition
        </button>
      </form>
    </div>
  )
}

export default PostTuition
