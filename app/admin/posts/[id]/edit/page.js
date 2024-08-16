import Container from '@/components/Container'
import EditPostForm from '@/components/EditPostForm'
import React from 'react'

const page = async ({ params }) => {
    const id = params.id
    const res = await fetch(`${process.env.URL}/api/posts/${id}`, { cache: 'no-store' });
    const data = await res.json();
    return (
        <div className='mb-36 lg:mt-36'>
            <Container>
                <EditPostForm id={id} prevTitle={data.title} prevContent={data.content} prevCategory={data.category} prevIsDraft={data.draft} />
            </Container>
        </div>
    )
}

export default page