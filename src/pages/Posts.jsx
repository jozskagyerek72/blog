import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { readPosts } from '../utils/crudUtil'
import { CardContainer } from '../components/CardContainer'
import { Cetegories } from '../components/Cetegories'
import { useSearchParams } from 'react-router-dom'
import { SearchBox } from '../components/Search'

export const Posts = () => {

  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState(null)
  const [selcateg, setSelcateg] = useState(searchParams.get("ctg") ? [searchParams.get("ctg")] : [])

  console.log("url paraméter: ", searchParams.get("ctg"));


  useEffect(() => {
    readPosts(setPosts, selcateg)
  }, [selcateg])

  return (
    <div>
      <div >
        <Cetegories selcateg={selcateg} setSelcateg={setSelcateg} />
        {posts&& <SearchBox items={posts.map(obj => ({id:obj.id, name:obj.title}))} />}
      </div>
      <CardContainer posts={posts} setPosts={setPosts} />


    </div>
  )
}

