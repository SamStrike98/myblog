import Container from '@/components/Container';
import SinglePost from '@/components/SinglePost';
import React from 'react'

const page = async ({ params }) => {
    const id = params.id;

    const res = await fetch(`${process.env.URL}/api/posts/${id}`, { cache: 'no-store' });
    const data = await res.json();
    return (
        <div className='flex flex-col items-center mb-36 lg:mt-36 min-h-[100vh]'>
            <Container>
                <SinglePost title={data.title} content={data.content} createdAt={data.createdAt} category={data.category} />
            </Container>
        </div>
    )
}

export default page