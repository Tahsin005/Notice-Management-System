import React from 'react'
import PostCard from '../PostCard/PostCard'
import './LastPosted.css'
const LastPosted = ({allPost}) => {
  // console.log("jkdjfdj");
  // console.log(allPost);
  return (
    <div className='flex justify-center last-posted-posts lg:block'>
        <p className='hidden font-sans text-2xl font-bold lg:block md:text-3xl xl:text-4xl '>Last Posted ⚡</p>
        <div className="scrollable-post-div flex flex-col overflow-scroll gap-2 lg:mt-12 max-w-[500px] h-[70vh]">
        {allPost && allPost.length > 0 ? allPost.map((cart, idx) => (
          <PostCard key={idx} id={idx} ct={cart} />
        )) : ""}
            {/* <PostCard ct = {allPost ? allPost[0] : ''}/> */}
        </div>
    </div>
  )
}

export default LastPosted