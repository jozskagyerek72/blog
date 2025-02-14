import React from 'react'
import { SingleCard } from './SingleCard'
import { middleStyle } from '../utils/utils'

export const CardContainer = ({ posts, setPosts }) => {



  return (
    <div style={{
      display: 'flex',
      flexDirection: "row",
      margin: "100px",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      flexWrap:"wrap"
    }}>
      {posts && posts.map((obj) => <SingleCard {...obj} key={obj.id} />)}
    </div>
  )
}

