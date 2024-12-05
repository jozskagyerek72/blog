import React from 'react'
import { middleStyle } from '../utils/utils'
import { Form } from 'react-router-dom'
import { useContext } from 'react'
import {userContext} from "../context/UserContext.jsx"
import {Notfound} from "../pages/Notfound.jsx"

export const Profile = () => {
  
  const {user} = useContext(userContext)
  if (!user) return <Notfound/>
  
  
  return (
    <div >
      <div style={middleStyle}>
        <h3>Profile settings</h3>
        <form>
          <label >Username:</label>
          <input type="text" name='displayName' />

          <input type="file" name="avatar"  />
        </form>

      </div>
    </div>
  )
}

