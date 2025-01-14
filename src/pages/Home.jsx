import React from 'react'

import { getCategories } from '../utils/firebaseApp'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { HashLoader } from 'react-spinners'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { TypeAnimation } from 'react-type-animation'
import { NavLink } from 'react-router-dom'
import { responsiveContainer } from '../utils/utils'

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

    const [loading, setLoading] = useState(false)
    const { categories } = useContext(CategContext)
    console.log(categories);


    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"column",
            marginTop:"10rem"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"


            }}>

                <TypeAnimation
                    sequence={[

                        'Blog: jármű',
                        1000,
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
                flexWrap: "wrap",

                gap: "10px"
            }}>
                {loading && <HashLoader />}
                {categories && categories.map((obj) =>
                    <Card key={obj.id}
                        style={{
                            width: "20rem",

                        }}
                    >
                        <img
                            alt="Sample"
                            src={obj.photoUrl}
                            style={{
                                aspectRatio: "9/16",
                                objectFit: 'cover'
                            }}
                        />
                        <CardBody>

                            <CardTitle tag="h5">
                                <NavLink to={"/posts?ctg=" + obj.name}> {obj.name} </NavLink>
                            </CardTitle>

                        </CardBody>
                    </Card>)}
            </div>
        </div>
    )
}

