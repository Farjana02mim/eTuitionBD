import TuitionCard from './TuitionCard'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'

const TuitionList = () => {
  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ['tuitions'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/tuitions`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      {tuitions && tuitions.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {tuitions.map(tuition => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      ) : (
        <p className='text-center mt-20 text-gray-500'>No tuitions available.</p>
      )}
    </Container>
  )
}

export default TuitionList
