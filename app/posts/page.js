import React from 'react'
import PostsList from '@/components/PostsList';
import Container from '@/components/Container';

const page = async () => {
    const res = await fetch(`${process.env.URL}/api/posts`, { cache: 'no-store' });
    const data = await res.json();

    return (
        <div className='mb-36 lg:mt-36'>
            <Container>
                {data &&
                    <PostsList data={data} />
                }
            </Container>

        </div>
    )
}

export default page