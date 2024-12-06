import React from 'react'
import { extraUrlAndId, middleStyle } from '../utils/utils'
import { Form } from 'react-router-dom'
import { useContext } from 'react'
import {userContext} from "../context/UserContext.jsx"
import {Notfound} from "../pages/Notfound.jsx"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { uploadFile } from '../utils/uploadFile.js'
import { ClimbingBoxLoader } from 'react-spinners'
import {Toastify} from "../components/Toastify.jsx"
import { useEffect } from 'react'

export const Profile = () => {
  
  const {user, updateUser, msg} = useContext(userContext)
  const {register,handleSubmit,formState:{errors}} = useForm({defaultValues:{
    displayName:user?.displayName
  }})
  const [photo,setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [avatar,setAvatar] = useState(null)

  useEffect(()=>{
    user?.photoURL && setAvatar(extraUrlAndId(user.photoURL).url)
  },[user])

  if (!user) return <Notfound/>

  const onSubmit = async (data) =>
  {
    setLoading(true)
    try {
      const file = data?.file? data?.file[0] : null
      const {url,id} = file? await uploadFile(file) : null

      updateUser(data.displayName,url+"/"+id)
      
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <div >
      <div style={middleStyle}>
        <h3>Profile settings</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label >Username:</label>
          <input {...register("displayName")} type='text'/>

          <label >Profile picture:</label>
          <input type="file" {...register("file", {
            validate:(value)=>{
                if(!value[0]) return true
                const acceptedFormats = ["png","jpg"]
                console.log(value[0]);
                const fileExtension = value[0].name.split(".").pop().toLowerCase()
                if(!acceptedFormats.includes(fileExtension)) return "invalid file format"
                if(!value[0].size>1*1000*1024) return "maximum file size is 1MB"
                return true
            }
          })}
          onChange={(e)=>setAvatar(URL.createObjectURL(e.target.files[0]))}  
          />
          <p className='text-danger'>{errors?.file?.message}</p>
          <input type='submit'/>
          {loading&& <ClimbingBoxLoader />}
        </form>
        {msg && <Toastify {...msg}/>}
        
        {avatar&& <img className='myavatar' style={{height:"100px", width:"100px", borderRadius:"100px"}} src={avatar} />}
      </div>
    </div>
  )
}

