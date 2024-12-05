import React from 'react'
import { middleStyle } from '../utils/utils'
import { Form } from 'react-router-dom'
import { useContext } from 'react'
import {userContext} from "../context/UserContext.jsx"
import {Notfound} from "../pages/Notfound.jsx"
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export const Profile = () => {
  
  const {user, updateUser} = useContext(userContext)
  const {register,handleSubmit,formState:{errors}} = useForm({defaultValues:{
    displayName:user?.displayName
  }})
  const [photo,setPhoto] = useState(null)
  
  if (!user) return <Notfound/>

  const onSubmit = async (data) =>
  {
    updateUser(data.displayName)
    
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
          onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}  
          />
          <input type='submit'/>
        </form>
        {photo&& <img src={photo} />}
      </div>
    </div>
  )
}

