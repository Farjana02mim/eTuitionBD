import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    toast.success("Message sent successfully!")
    reset()
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-lg">
      <h1 className="text-4xl font-bold text-gray-700 text-center mb-6">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-900"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-900"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            placeholder="Your Message"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-900"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-gray-400 to-blue-500 hover:from-gray-500 hover:to-blue-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
