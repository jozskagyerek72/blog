import React from 'react'
import { middleStyle } from '../utils/utils'
import { useContext } from 'react'
import { userContext } from '../context/UserContext'
import { useConfirm } from 'material-ui-confirm'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const DeleteAccount = () => {
    
    const {user, logOutUser, deleteAccount} = useContext(userContext)
    const navigate = useNavigate()
    const confirm = useConfirm()

    useEffect(()=>{
        !user && navigate("/")
    },[user])

    const handleDel = async () =>
    {
        try {
            await confirm({
                description : "changes cannot be unmade",
                confirmationText : "confirm",
                cancellationText : "cancel",
                title : "Do you really want to delete your account?"
            })
            await deleteAccount()
            logOutUser()

        } catch (error) {
            console.log("cancel: ", error);
            
        }
    }

    return (
    <div style={middleStyle}>
      <button className="btn btn-danger" onClick={handleDel}>delete acc</button>
    </div>
  )
}

