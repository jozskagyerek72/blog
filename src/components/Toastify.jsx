import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { userContext } from '../context/UserContext'

export const Toastify = ({signin,err, signup, resetPw, update}) => {
  
    const {setMsg} = useContext(userContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if (err) 
        {
            toast.error(err,{position:"top-left"})
        }else if (signin||signup)
        {
            toast.success(signin||signup, {position:"top-center"})
            setTimeout(()=>navigate("/"),2000)
        }else if(resetPw){
          toast.success(resetPw,{position:"top-center"})
          setTimeout(()=>navigate("/"),2000)
        }else if(update)
          {
            toast.success(update,{position:"top-center"})
          }
        setMsg({})
    },[signin,err, signup, resetPw, update])
  
    return (
    <div>
      <ToastContainer />
    </div>
  )
}

