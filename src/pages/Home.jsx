import React from 'react'
import { CardFilter } from '../components/Card'
import { getCategories } from '../utils/firebaseApp'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { HashLoader } from 'react-spinners'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { TypeAnimation } from 'react-type-animation'

const middleStyle =
{
    width: "300px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-200%, -50%)",
    display: "flex",
    flexdirection: "row"
}

export const Home = () => {

    /*
    const [data,setData] = useState([])
    marci megoldasa volt
    useEffect(()=>{
        getCategories().then((v)=>setData(v)) // vicces
    })
        */

    const [loading, setLoading] = useState(false)
    const { categories } = useContext(CategContext)
    console.log(categories);


    return (
        <div >
        <div style={{
            display: "flex",
            flexDirection: "row",
            transform: "translate(20%, 200%)"
        }}>

            {/*data.map((v, i)=> (
            <CardFilter key={i} img_url={v._document.data.value.mapValue.fields.photoUrl.stringValue} filter={v._document.data.value.mapValue.fields.name.stringValue}/>
        ))*/}

            {/* <CardFilter img_url="public\entertaiment.jpg" filter="entertimant"/>
        <CardFilter img_url="public\technology.jpg" filter="technology"/>
        <CardFilter img_url="public\1998_Volkswagen_Passat_S_TDi_1.9_Front.jpg" filter="passat"/> */}

            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Blog: jármű',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'Blog: Konyha',
                    1000,
                    'Blog: Szórakozás',
                    1000,
                    'Blog: Technológia',
                    1000
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={Infinity}
            />
            </div>
            <div className="categs" style={{
            display: "flex",
            flexDirection: "row",
            transform: "translate(20%, 50%)"
        }}>
            {loading && <HashLoader />}
            {categories && categories.map((obj) =>
                <Card key={obj.id}
                    style={{
                        width: 300,
                        height: 400
                    }}
                >
                    <img
                        alt="Sample"
                        src={obj.photoUrl}
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            {obj.name}
                        </CardTitle>

                    </CardBody>
                </Card>)}
            </div>
        </div>
    )
}

