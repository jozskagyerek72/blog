import React from 'react'
import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { userContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { useEffect } from 'react'

const middleStyle =
{
    width: "300px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

}

export const Auth = () => {


    const {user, signInUser, singUpUser, msg, setMsg} = useContext(userContext)
    const location = useLocation()
    console.log(location.pathname);
    const isSignIn = location.pathname=="/auth/in" //🤓 ha egyenlo akkot true
    //console.log(user);

    useEffect(()=>{
        setMsg(null)
    },[])

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault
        console.log("submitted");
        const data = new FormData(event.currentTarget)
        console.log(data.get("email"), data.get("password"));
        if(isSignIn){

            signInUser(data.get('email'), data.get('password'))
        }else {
            singUpUser(data.get("email"), data.get("password"), data.get("displayName"))
        }

    }

    return (
        <div className='page'>
            <div style={middleStyle}>
                <h3>{isSignIn?"Sign ℹ🆖":"Sign 🆙"}</h3>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="with a placeholder"
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
                            placeholder="password placeholder"
                            type="password"
                        />
                    </FormGroup>
                    {!isSignIn&&
                    <>
                        <FormGroup>
                        <Label for="exampleEmail">
                            Username
                        </Label>
                        <Input
                            id="exampleUsername"
                            name="displayName"
                            placeholder="with a placeholder"
                            type="username"
                        />
                    </FormGroup>
                    </>}
                    <Button>submit</Button>
                </Form>
                {isSignIn&& <a href="#" onClick={()=>navigate("/pwreset")}>Forgotten password...</a>}
                {msg && <Toastify {...msg} />}
            </div>
        </div>
    )
}

