import { useSelector } from 'react-redux'

import Post from '../Posts/Post/Post'

import Loader from '../Loader/Loader'

const Posts = ({ setCurrentId }) => {

  const posts = useSelector(state => state.posts)
  return (
    <div>
      {!posts.length ? <Loader /> : <>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {posts.map(post => (
            <Post post={post} setCurrentId={setCurrentId} key={post._id} />
          ))}
        </div>
      </>}
    </div>
  )
}

export default Posts