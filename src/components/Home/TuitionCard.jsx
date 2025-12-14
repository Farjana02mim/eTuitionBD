import { Link } from 'react-router'

const TuitionCard = ({ tuition }) => {
  const { _id, title, category, price, seats, image } = tuition || {}

  return (
    <Link
      to={`/tuition/${_id}`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <img
            className='object-cover h-full w-full group-hover:scale-110 transition'
            src={image}
            alt='Tuition Image'
          />
        </div>

        <div className='font-semibold text-lg'>{title}</div>
        <div className='font-semibold text-gray-600'>Category: {category}</div>
        <div className='font-semibold text-gray-600'>Seats: {seats}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>Price: ${price}</div>
        </div>
      </div>
    </Link>
  )
}

export default TuitionCard
