const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-90
          transition
          cursor-pointer
          px-4
          w-full
          ${outline ? 'bg-gray-100 text-gray-800 border-gray-400' : 'bg-gradient-to-r from-gray-500 via-blue-500 to-blue-700 text-white border-transparent'}
          ${small ? 'text-sm py-1 font-light border' : 'text-md py-3 font-semibold border-2'}
        `}
    >
      {/* Optional icon */}
      {Icon && (
        <Icon
          size={24}
          className='absolute left-4 top-3'
        />
      )}
      {label}
    </button>
  )
}

export default Button
