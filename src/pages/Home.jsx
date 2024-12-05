import React from 'react'
import { CardFilter } from '../components/Card'
import { getCategories } from '../utils/firebaseApp'
import { useState } from 'react'
import { useEffect } from 'react'

const middleStyle =
{
    width: "300px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-200%, -50%)",
    display:"flex",
    flexdirection: "row"
}

export const Home = () => {

    const [data,setData] = useState([])

    useEffect(()=>{
        getCategories().then((v)=>setData(v)) // vicces
    })
  return (
    <div style={middleStyle}>

        {data.map((v, i)=> (
            <CardFilter key={i} img_url={v._document.data.value.mapValue.fields.photoUrl.stringValue} filter={v._document.data.value.mapValue.fields.name.stringValue}/>
        ))}

        {/* <CardFilter img_url="public\entertaiment.jpg" filter="entertimant"/>
        <CardFilter img_url="public\technology.jpg" filter="technology"/>
        <CardFilter img_url="public\1998_Volkswagen_Passat_S_TDi_1.9_Front.jpg" filter="passat"/> */}
        
    </div>
  )
}

