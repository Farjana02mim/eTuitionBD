import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const ApplyTuitionForm = ({ tuitionId, closeModal }) => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit } = useForm()

  const onSubmit = async data => {
    const application = {
      ...data,
      tuitionId,
      studentEmail: user.email,
      status: 'pending',
    }
    await axiosSecure.post('/applications', application)
    toast.success('Application submitted')
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <textarea
        {...register('message', { required: true })}
        placeholder='Why should you be selected?'
        className='input'
      />
      <button className='btn-primary w-full'>Apply</button>
    </form>
  )
}

export default ApplyTuitionForm
