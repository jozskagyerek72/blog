import React from 'react'
import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { userContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { useEffect } from 'react'
import { authStyle } from '../utils/utils'



export const Auth = () => {


    const { user, signInUser, singUpUser, msg, setMsg } = useContext(userContext)
    const location = useLocation()
    console.log(location.pathname);
    const isSignIn = location.pathname == "/auth/in" //🤓 ha egyenlo akkot true
    //console.log(user);

    useEffect(() => {
        setMsg(null)
    }, [])

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault
        console.log("submitted");
        const data = new FormData(event.currentTarget)
        console.log(data.get("email"), data.get("password"));
        if (isSignIn) {

            signInUser(data.get('email'), data.get('password'))
        } else {
            singUpUser(data.get("email"), data.get("password"), data.get("displayName"))
        }

    }

    return (
        <div >
            <div style={authStyle}>
                <h3>{isSignIn ? "Sign in" : "Sign up"}</h3>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Enter your email adress"
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">
                            Password
                        </Label>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                        />
                    </FormGroup>
                    {!isSignIn &&
                        <>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Username
                                </Label>
                                <Input
                                    id="exampleUsername"
                                    name="displayName"
                                    placeholder="Choose a username"
                                    type="username"
                                />
                            </FormGroup>
                        </>}
                    <Button style={{marginBottom:20, marginTop:30, width:"100%"}}>Submit</Button>
                </Form>
                {isSignIn && <a style={{textDecoration:"none", color:"#1f0d3d"}}  href="#" onClick={() => navigate("/pwreset")}>Forgotten password...</a>}
                {msg && <Toastify {...msg} />}
            </div>
        </div>
    )
}

