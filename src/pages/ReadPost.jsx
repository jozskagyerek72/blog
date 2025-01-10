import React from 'react'
import { middleStyle } from '../utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { deletePost, readSinglePost, toggleLikes } from '../utils/crudUtil'
import parse from "html-react-parser"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext } from 'react'
import { userContext } from '../context/UserContext'

import { useConfirm } from 'material-ui-confirm'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Alerts } from '../components/Alerts'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export const ReadPost = () => {

    const { user } = useContext(userContext)
    const params = useParams()
    const navigate = useNavigate()
    const confirm = useConfirm()
    console.log(params);
    const [post, setPost] = useState(null)
    const [txt, setTxt] = useState(null)

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

    const handleLike = () => {
        if (!user) setTxt("be kell jeneltkezni")
        else toggleLikes(user.uid, post.id)
    }

    return (
        <div style={{
            maxWidth: 800,
            height: 800,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 100,
            border: "solid 1px black",
            borderRadius: "10px",
            backgroundColor: "whitesmoke",
            fontFamily: "Roboto Mono, serif"
        }}>
            {post && <>
                <img style={{
                    maxHeight: 300,
                    display:"flex",
                    marginTop: 20,
                    marginLeft:"auto",
                    marginRight:"auto"
                }} src={post.photo["url"]} alt={post.title} />
                <p>{parse(post.story)}</p>
            </>}
            <div style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginLeft: 10,
                marginTop:  100
            }}>
                <button className="btn btn-danger" onClick={() => navigate("/posts")} ><ArrowBackIosIcon /> Vissza a posztokhoz</button>

                <div style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: 20,

                }}>
                    {user && post && (user.uid == post.userId) &&
                        <>
                            <button><DeleteForeverIcon onClick={handleDelete} /></button>
                            <button onClick={()=>navigate("/update/"+post.id)} ><EditNoteIcon /></button>
                        </>
                    }
                    <button onClick={handleLike}>{/*post.likes.includes(user.uid) ? <ThumbUpAltIcon onClick={handleLike}/> : <ThumbUpOffAltIcon onClick={handleLike}/>  console.log(post.id)
                    */} <ThumbUpOffAltIcon  /></button>
                    {post && <span style={{ fontWeight: "bold" }}>likes: {post.likes.length || 0}</span>}
                    {txt && <Alerts txt={txt} err={false} />}
                </div>
            </div>

        </div>
    )
}

