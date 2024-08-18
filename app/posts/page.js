import React from 'react'
import PostsList from '@/components/PostsList';
import Container from '@/components/Container';

const page = async () => {
    const res = await fetch(`${process.env.URL}/api/posts`, { cache: 'no-store' });
    const data = await res.json();

    console.log(data)

    return (
        <div className='mb-36 lg:mt-36'>
            <Container>
                {data.length > 0 ?
                    <PostsList data={data} />
                    :
                    <p className='font-bold text-3xl mt-10'>No posts to Show!</p>


                }
            </Container>

        </div>
    )
}

export default page