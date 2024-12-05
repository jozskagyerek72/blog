import React from 'react'
import { middleStyle } from '../utils/utils'
import { Form } from 'react-router-dom'
import { useContext } from 'react'
import {userContext} from "../context/UserContext.jsx"
import {Notfound} from "../pages/Notfound.jsx"
import { useForm } from 'react-hook-form'

export const Profile = () => {
  
  const {user} = useContext(userContext)
  const {register,handleSubmit,formState:{errors}} = useForm({defaultValues:{
    displayName:user?.displayName
  }})
  
  if (!user) return <Notfound/>

  const onSubmit = async (data) =>
  {
    console.log(data,"onsubmit");
  }

  
  return (
    <div >
      <div style={middleStyle}>
        <h3>Profile settings</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label >Username:</label>
          <input {...register("displayName")} type='text'/>

          <label >Profile picture:</label>
          <input type="file" {...register("file", {required:true})}  />
          <input type='submit'/>
        </form>

      </div>
    </div>
  )
}

