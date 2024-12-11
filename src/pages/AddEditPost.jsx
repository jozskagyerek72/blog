import React from 'react'
import { useContext } from 'react'
import { userContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ClimbingBoxLoader } from 'react-spinners'
import { Toastify } from '../components/Toastify'
import { middleStyle } from '../utils/utils'
import { Story } from "../components/Story.jsx"
import { uploadFile } from "../utils/uploadFile.js"
import { addPost } from '../utils/crudUtil.js'

export const AddEditPost = () => {

  const [uploaded, setUploaded] = useState(false)
  const [story, setStory] = useState(null)


  //headerbol szedett cuccok
  const { user, msg } = useContext(userContext)
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  if (!user) { return <Home /> }

  const onSubmit = async (data) => {
    setLoading(true)
    console.log(data);

    let newPostData = {
      ...data,
      story,
      author: user.displayName,
      userId: user.uid,
      category: ""
    }

    
    try {

      const file = data?.file ? data?.file[0] : null
      const { url, id } = file ? await uploadFile(file) : null
      delete newPostData.file
      newPostData = { ...newPostData, photo : { url,id } }
      console.log("new post: ", newPostData);
      addPost(newPostData)
      setUploaded(true)

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={middleStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label >Post title:</label>
        <input {...register("title", { required: true })} type='text' placeholder='Title' />

        <p className='text-danger' >{errors?.title && "Please add a title"}</p>

        <Story setStory={setStory} uploaded={uploaded} />

        <label >picture</label>
        <input type="file" {...register("file", {
          validate: (value) => {
            if (!value[0]) return true
            const acceptedFormats = ["png", "jpg"]
            //console.log(value[0]);
            const fileExtension = value[0].name.split(".").pop().toLowerCase()
            if (!acceptedFormats.includes(fileExtension)) return "invalid file format"
            if (!value[0].size > 1 * 1000 * 1024) return "maximum file size is 1MB"
            return true
          }
        })}
          onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
        />
        <p className='text-danger'>{errors?.file?.message}</p>
        <input type='submit' />
        {loading && <ClimbingBoxLoader />}
      </form>
      {msg && <Toastify {...msg} />}

      {avatar && <img className='myavatar' style={{ height: "100px", width: "100px", borderRadius: "100px" }} src={avatar} />}

    </div >
  )
}

