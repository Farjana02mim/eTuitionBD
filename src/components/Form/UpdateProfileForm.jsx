import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import toast from 'react-hot-toast'

const UpdateProfileForm = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
    },
  })

  const onSubmit = async data => {
    await axiosSecure.patch(`/users/${user.email}`, data)
    toast.success('Profile updated')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <input {...register('name')} className='input' />
      <input disabled {...register('email')} className='input bg-gray-200' />
      <button className='btn-primary w-full'>Update</button>
    </form>
  )
}

export default UpdateProfileForm
