import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { imageUpload, saveOrUpdateUser } from '../../utils'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const ProfileSettings = () => {
  const { user, updateUserProfile, loading, setLoading } = useAuth()
  const [name, setName] = useState(user?.displayName || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [photo, setPhoto] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let photoURL = user?.photoURL
      if (photo) {
        photoURL = await imageUpload(photo)
      }

      await updateUserProfile(name, photoURL)
      await saveOrUpdateUser({ name, email: user?.email, image: photoURL, phone })

      toast.success('Profile updated successfully!')
    } catch (err) {
      console.log(err)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-200 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email (read-only)</label>
          <input
            type="email"
            value={user?.email}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-200 text-gray-900"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-200 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full text-sm text-gray-500 border border-dashed border-gray-300 rounded-md cursor-pointer p-2 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-gray-400 to-blue-500 text-white rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default ProfileSettings
