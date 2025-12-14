import { ClipLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
        flex 
        flex-col 
        justify-center 
        items-center`}
    >
      <ClipLoader size={60} color='#3b82f6' /> {/* Blue spinner */}
    </div>
  )
}

export default LoadingSpinner
