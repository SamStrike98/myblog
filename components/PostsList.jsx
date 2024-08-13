import Link from 'next/link'
import PostCard from './PostCard'

const PostsList = ({ data }) => {
    console.log(data)
    return (
        <div>
            <h1>Posts List</h1>
            <ul>
                {data.map(post => (
                    <PostCard key={post._id} id={post._id} title={post.title} createdAt={post.createdAt} />
                ))}
            </ul>
        </div>
    )
}

export default PostsList