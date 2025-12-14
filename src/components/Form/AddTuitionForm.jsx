import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

const AddTuitionForm = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async data => axiosSecure.post('/tuitions', data),
    onSuccess: () => {
      toast.success('Tuition added successfully')
      reset()
    },
  })

  const onSubmit = async data => {
    const tuitionData = {
      ...data,
      salary: Number(data.salary),
      tutor: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      status: 'pending',
    }
    await mutateAsync(tuitionData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <input
        {...register('subject', { required: 'Subject required' })}
        placeholder='Subject'
        className='input'
      />
      <input
        {...register('classLevel', { required: 'Class required' })}
        placeholder='Class'
        className='input'
      />
      <input
        {...register('salary', { required: 'Salary required' })}
        type='number'
        placeholder='Salary'
        className='input'
      />
      <textarea
        {...register('description', { required: true })}
        placeholder='Description'
        className='input'
      />

      <button className='btn-primary w-full'>
        {isPending ? <TbFidgetSpinner className='animate-spin mx-auto' /> : 'Add Tuition'}
      </button>
    </form>
  )
}

export default AddTuitionForm
