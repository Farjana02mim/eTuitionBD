import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UpdateTuitionForm = ({ tuition, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit } = useForm({
    defaultValues: tuition,
  })

  const onSubmit = async data => {
    await axiosSecure.patch(`/tuitions/${tuition._id}`, data)
    toast.success('Updated successfully')
    refetch()
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <input {...register('subject')} className='input' />
      <input {...register('classLevel')} className='input' />
      <input {...register('salary')} type='number' className='input' />
      <textarea {...register('description')} className='input' />

      <button className='btn-primary w-full'>Update</button>
    </form>
  )
}

export default UpdateTuitionForm
