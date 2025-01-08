import React from 'react'
import { middleStyle } from '../utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { deletePost, readSinglePost } from '../utils/crudUtil'
import parse from "html-react-parser"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext } from 'react'
import { userContext } from '../context/UserContext'

import { useConfirm } from 'material-ui-confirm'


export const ReadPost = () => {

    const { user } = useContext(userContext)
    const params = useParams()
    const navigate = useNavigate()
    const confirm = useConfirm()
    console.log(params);
    const [post, setPost] = useState(null)

    useEffect(() => {
        readSinglePost(params.id, setPost)
    }, [])

    console.log(post);

    const handleDelete = async () => {

        try {
            await confirm({
                description: "changes cannot be unmade",
                confirmationText: "confirm",
                cancellationText: "cancel",
                title: "Do you really want to delete this post?"
            })
            deletePost(post.id)
            

            navigate("/posts")

        } catch (error) {
            console.log("cancel: ", error);

        }

    }

    return (
        <div style={middleStyle}>
            {post && <>
                <img src={post.photo["url"]} alt={post.title} />
                <p>{parse(post.story)}</p>
            </>}
            <button className="btn btn-danger" onClick={() => navigate("/posts")} >go back</button>
            {user && post && (user.uid == post.userId) &&
                <button><DeleteForeverIcon onClick={handleDelete} /></button>
            }
        </div>
    )
}

