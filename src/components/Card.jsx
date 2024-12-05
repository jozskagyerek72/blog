import React from 'react'
import { Card,CardBody, } from 'reactstrap'
import { Button } from 'reactstrap'

export const CardFilter = ({ img_url, filter }) => {
    return (
        <div>
            <Card inverse 
                style={{
                    width: '18rem',
                    maxHeight:"30rem"
                }}
            >
                <img
                    alt="Sample"
                    src={img_url}
                    style={{objectFit:"cover", aspectRatio:"9/16"}}
                />
                <CardBody>
                    <Button style={{
                       
                    }}>
                        {filter}
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}


