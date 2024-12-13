import React from 'react'
import { middleStyle } from '../utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { readSinglePost } from '../utils/crudUtil'



export const ReadPost = () => {
    
    const params = useParams()
    const navigate = useNavigate()
    console.log(params);
    const [post,setPost] = useState(null)

    useEffect(()=>{
        readSinglePost(params.id, setPost)
    },[])

    console.log(post
        
    );
    
    
    return (
        <div style={middleStyle}>
            
            <button className="btn btn-danger" onClick={()=>navigate("/posts")} >go back</button>
        </div>
    )
}

