import React from 'react'
import { middleStyle } from '../utils/utils'
import { useContext } from 'react'
import { userContext } from '../context/UserContext'
import { useConfirm } from 'material-ui-confirm'

export const DeleteAccount = () => {
    
    const {user, logOutUser, deleteAccount} = useContext(userContext)
    const confirm = useConfirm()

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

