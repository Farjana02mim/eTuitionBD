import { useNavigate } from 'react-router'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen flex items-center">
      <div className="container flex flex-col items-center justify-center px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <p className="p-3 text-sm font-medium text-white rounded-full bg-gradient-to-r from-gray-400 to-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Something Went Wrong!
          </h1>
          <p className="mt-4 text-gray-500">
            Here are some helpful links:
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gradient-to-r from-gray-200 to-blue-200 border rounded-lg gap-x-2 sm:w-auto hover:from-gray-300 hover:to-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-1/2 px-5 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-gray-400 to-blue-500 hover:from-gray-500 hover:to-blue-600 sm:w-auto"
            >
              Take Me Home
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
