import React from 'react'

import { Form } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { useContext } from 'react'
import { userContext } from '../context/UserContext.jsx'
import { Toastify } from '../components/Toastify.jsx'
import { authStyle } from '../utils/utils.js'

export const PwReset = () => {
 
  const {msg, resetPassword} = useContext(userContext)

  const handleSubmit = (e) =>
  {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      //console.log(data.get("email"));
      resetPassword(data.get("email"))
      
  }
 
  return (
    <div>
       <div >
            <div style={authStyle}>
                <h3>Reset password</h3>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Enter your email address"
                            type="email"
                        />
                    </FormGroup>
                    
                    
                    <Button style={{marginBottom:20, marginTop:30, width:"100%"}}>Request new password</Button>
                </Form>
                
                {msg && <Toastify {...msg} />}
            </div>
        </div>
    </div>
  )
}

