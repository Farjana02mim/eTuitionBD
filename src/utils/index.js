import axios from "axios"

// Upload image to imgbb
export const imageUpload = async (imageData) => {
  if (!imageData) return null
  const formData = new FormData()
  formData.append("image", imageData)

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    )
    return data?.data?.display_url
  } catch (err) {
    console.error("Image upload failed:", err)
    throw err
  }
}

// Upload image to Cloudinary (optional)
export const imageUploadCloudinary = async (imageData) => {
  if (!imageData) return null
  const formData = new FormData()
  formData.append("file", imageData)
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    )
    return data.secure_url
  } catch (err) {
    console.error("Cloudinary upload failed:", err)
    throw err
  }
}

// Save or update user in database
export const saveOrUpdateUser = async (userData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/users`,
      userData
    )
    return data
  } catch (err) {
    console.error("Error saving/updating user:", err)
    throw err
  }
}
